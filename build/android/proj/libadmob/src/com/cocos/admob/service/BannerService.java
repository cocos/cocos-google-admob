package com.cocos.admob.service;

import android.content.res.Resources;
import android.graphics.Color;
import android.graphics.Rect;
import android.os.Bundle;
import android.util.Log;
import android.view.DisplayCutout;
import android.view.Surface;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowInsets;
import android.view.WindowManager;
import android.view.WindowMetrics;
import android.widget.RelativeLayout;

import androidx.annotation.NonNull;

import com.cocos.admob.AdServiceHub;
import com.cocos.admob.core.Bridge;
import com.cocos.admob.misc.BannerSizeType;
import com.cocos.admob.proto.banner.BannerAdListenerNTF;
import com.cocos.admob.proto.banner.BannerPaidEventNTF;
import com.cocos.admob.proto.banner.DestroyBannerACK;
import com.cocos.admob.proto.banner.DestroyBannerREQ;
import com.cocos.admob.proto.banner.LoadBannerACK;
import com.cocos.admob.proto.banner.LoadBannerREQ;
import com.cocos.admob.proto.banner.ShowBannerREQ;
import com.cocos.lib.CocosActivity;
import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.AdapterResponseInfo;
import com.google.android.gms.ads.LoadAdError;

import java.lang.reflect.Field;
import java.util.HashMap;

/**
 * Internal class for banner ads.
 */
public final class BannerService extends Service {

    private class Insets {
        public int top = 0;
        public int bottom = 0;
        public int left = 0;
        public int right = 0;
    }

    private static final String TAG = "BannerService";
    HashMap<String, AdView> bannerMap = new HashMap<>();

    public void init(Bridge bridge, CocosActivity activity) {
        super.init(bridge, activity);

        bridge.getRoute().on(LoadBannerREQ.class.getSimpleName(), LoadBannerREQ.class, arg -> {
            LoadBannerREQ req = (LoadBannerREQ) arg;
            if (!bannerMap.containsKey(req.unitId)) {
                this.createBannerView(req);
            }
            String unitId = req.unitId;
            LoadBannerACK ack = new LoadBannerACK(unitId);
            String method = LoadBannerACK.class.getSimpleName();
            ack.unitId = unitId;
            loadBannerAd(req.unitId);
            bridge.sendToScript(method, ack);
        });

        bridge.getRoute().on(ShowBannerREQ.class.getSimpleName(), ShowBannerREQ.class, arg -> {
            ShowBannerREQ sb = (ShowBannerREQ) arg;
            showBanner(sb.unitId, sb.visible);
        });

        bridge.getRoute().on(DestroyBannerREQ.class.getSimpleName(), DestroyBannerREQ.class, arg -> {
            DestroyBannerREQ sb = (DestroyBannerREQ) arg;
            destroyByUnitId(sb.unitId);
            DestroyBannerACK ack = new DestroyBannerACK(sb.unitId);
            ack.unitId = sb.unitId;
            bridge.sendToScript(DestroyBannerACK.class.getSimpleName(), ack);
        });
    }

    public void destroy() {
        // TODO: destroy all banners
        for (String key : bannerMap.keySet()) {
            AdView value = bannerMap.get(key);
            value.destroy();
        }
        bannerMap.clear();
    }
    private Insets getSafeInsets(Window w) {
        Insets i = new Insets();

        if (android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.M) {
            return i;
        }

        WindowInsets wi = w.getDecorView().getRootWindowInsets();
        if (android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.P) {
            return i;
        }

        DisplayCutout dc = wi.getDisplayCutout();
        if (dc == null) {
            return i;
        }

        i.top = dc.getSafeInsetTop();
        i.bottom = dc.getSafeInsetBottom();
        i.left = dc.getSafeInsetLeft();
        i.right = dc.getSafeInsetRight();
        return i;
    }

    private AdView createBannerView(LoadBannerREQ req) {
        String unitId = req.unitId;
        String bannerSize = req.bannerSize;
        String[] alignments = req.alignments;

        Window w = activity.getWindow();
        Insets insets = getSafeInsets(w);
        ViewGroup vg = (ViewGroup) w.getDecorView();

        // create banner view and container manually
        RelativeLayout rl = new RelativeLayout(activity);
        RelativeLayout.LayoutParams lp = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT);
        lp.addRule(RelativeLayout.ALIGN_TOP);
        lp.addRule(RelativeLayout.CENTER_HORIZONTAL);
        rl.setLayoutParams(lp);
        vg.addView(rl);

        AdView adview = new AdView(activity);
        rl.addView(adview);

        adview.setAdUnitId(unitId);
        adview.setBackgroundColor(Color.TRANSPARENT);
        AdSize adSize = getAdSize(vg, req.bannerSizeType, req.bannerSize);
        //AdSize adSize = getAdSize(vg);
        adview.setAdSize(adSize);
        RelativeLayout.LayoutParams bannerLp = getLayoutParams(alignments, insets);
        adview.setLayoutParams(bannerLp);
        bannerMap.put(unitId, adview);
        return adview;
    }

    private AdSize getAdSize(ViewGroup viewGroup, String bannerSizeType, String bannerSize){
        switch (bannerSizeType){
            case BannerSizeType.Builtin:
                return getAdSize(bannerSize);
            default: // LoadBannerREQ.AnchoredAdaptive
                return getAdSize(viewGroup, bannerSizeType);
        }
    }

    private  AdSize getAdSize(String bannerSize){
        AdSize adSize;

        try {
            Field filed = AdSize.class.getDeclaredField(bannerSize);
            adSize = (AdSize) filed.get(AdSize.class);
        } catch (NoSuchFieldException e) {
            throw new RuntimeException(e);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
        return adSize;
    }

    private AdSize getAdSize(ViewGroup adContainerView, String bannerSizeType ) {
        if( android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.R ){
            Log.w(TAG, "getAdSize: SDK version is not matched");
            return  AdSize.BANNER;
        }
        WindowMetrics windowMetrics = getWindowManager().getCurrentWindowMetrics();
        Rect bounds = windowMetrics.getBounds();

        float adWidthPixels = adContainerView.getWidth();
        // If the ad hasn't been laid out, default to the full screen width.
        if (adWidthPixels == 0f) {
            adWidthPixels = bounds.width();
        }

        float density = getResources().getDisplayMetrics().density;
        int adWidth = (int) (adWidthPixels / density);

        switch (bannerSizeType){
            case BannerSizeType.Portrait:
                return AdSize.getPortraitAnchoredAdaptiveBannerAdSize(activity, adWidth);
            case BannerSizeType.Landscape:
                return AdSize.getLandscapeAnchoredAdaptiveBannerAdSize(activity, adWidth);
            case BannerSizeType.Current:
                return AdSize.getCurrentOrientationAnchoredAdaptiveBannerAdSize(activity, adWidth);
            default:
                return AdSize.BANNER;
        }
    }

    private RelativeLayout.LayoutParams getLayoutParams(String[] alignments, Insets insets){
        RelativeLayout.LayoutParams bannerLp = new RelativeLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
        );

        try {
            if (alignments != null) {
                for (int i = 0; i < alignments.length; i++) {
                    String a = alignments[i];
                    Field filed = RelativeLayout.class.getDeclaredField(a);
                    int rule = filed.getInt(RelativeLayout.class);
                    if( rule == RelativeLayout.ALIGN_TOP ){
                        bannerLp.topMargin = insets.top;
                    }else if( rule == RelativeLayout.ALIGN_BOTTOM){
                        bannerLp.bottomMargin = insets.bottom;
                    }else if( rule == RelativeLayout.ALIGN_LEFT){
                        bannerLp.leftMargin = insets.left;
                    }else if( rule == RelativeLayout.ALIGN_RIGHT){
                        bannerLp.rightMargin = insets.right;
                    }
                    bannerLp.addRule(rule);
                }
            }
        } catch (NoSuchFieldException e) {
            throw new RuntimeException(e);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
        return bannerLp;
    }

    private void loadBannerAd(String unitId) {
        AdView adview = bannerMap.get(unitId);
        // Create an ad request.
        AdRequest adRequest = new AdRequest.Builder()
                .setRequestAgent(AdServiceHub.extensionVersion)
                .build();
        String method = BannerAdListenerNTF.class.getSimpleName();
        adview.setAdListener(new AdListener() {
            @Override
            public void onAdClicked() {
                Log.d(TAG, "onAdClicked: ");
                super.onAdClicked();
                BannerAdListenerNTF ntf = new BannerAdListenerNTF(unitId, "onAdClicked");
                bridge.sendToScript(method, ntf);
            }

            @Override
            public void onAdClosed() {
                Log.d(TAG, "onAdClosed: ");
                super.onAdClosed();
                BannerAdListenerNTF ntf = new BannerAdListenerNTF(unitId, "onAdClosed");
                bridge.sendToScript(method, ntf);
            }

            @Override
            public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                Log.d(TAG, "onAdFailedToLoad: ");
                super.onAdFailedToLoad(loadAdError);
                BannerAdListenerNTF ntf = new BannerAdListenerNTF(unitId, "onAdClosed", loadAdError.toString());
                bridge.sendToScript(method, ntf);
            }

            @Override
            public void onAdImpression() {
                Log.d(TAG, "onAdImpression: ");
                super.onAdImpression();
                BannerAdListenerNTF ntf = new BannerAdListenerNTF(unitId, "onAdImpression");
                bridge.sendToScript(method, ntf);
            }

            @Override
            public void onAdLoaded() {
                Log.d(TAG, "onAdLoaded: ");
                super.onAdLoaded();
                BannerAdListenerNTF ntf = new BannerAdListenerNTF(unitId, "onAdLoaded");
                bridge.sendToScript(method, ntf);

                adview.setOnPaidEventListener(adValue -> {

                    BannerPaidEventNTF bannerPaidEventNTF = new BannerPaidEventNTF(unitId);

                    bannerPaidEventNTF.valueMicros = adValue.getValueMicros();
                    bannerPaidEventNTF.currencyCode = adValue.getCurrencyCode();
                    bannerPaidEventNTF.precision = adValue.getPrecisionType();

                    AdapterResponseInfo loadedAdapterResponseInfo = adview.getResponseInfo().
                            getLoadedAdapterResponseInfo();
                    bannerPaidEventNTF.adSourceName = loadedAdapterResponseInfo.getAdSourceName();
                    bannerPaidEventNTF.adSourceId = loadedAdapterResponseInfo.getAdSourceId();
                    bannerPaidEventNTF.adSourceInstanceName = loadedAdapterResponseInfo.getAdSourceInstanceName();
                    bannerPaidEventNTF.adSourceInstanceId = loadedAdapterResponseInfo.getAdSourceInstanceId();

                    Bundle extras = adview.getResponseInfo().getResponseExtras();
                    bannerPaidEventNTF.mediationGroupName = extras.getString("mediation_group_name");
                    bannerPaidEventNTF.mediationABTestName = extras.getString("mediation_ab_test_name");
                    bannerPaidEventNTF.mediationABTestVariant = extras.getString("mediation_ab_test_variant");

                    bridge.sendToScript(BannerPaidEventNTF.class.getSimpleName(), bannerPaidEventNTF);
                });
            }

            @Override
            public void onAdOpened() {
                Log.d(TAG, "onAdOpened: ");
                super.onAdOpened();
                BannerAdListenerNTF ntf = new BannerAdListenerNTF(unitId, "onAdOpened");
                bridge.sendToScript(method, ntf);
            }

            @Override
            public void onAdSwipeGestureClicked() {
                Log.d(TAG, "onAdSwipeGestureClicked: ");
                super.onAdSwipeGestureClicked();
                BannerAdListenerNTF ntf = new BannerAdListenerNTF(unitId, "onAdSwipeGestureClicked");
                bridge.sendToScript(method, ntf);
            }
        });
        // Start loading the ad in the background.
        adview.loadAd(adRequest);
    }

    private void showBanner(String unitId, boolean visible) {
        if (!bannerMap.containsKey(unitId)) {
            return;
        }
        AdView adView = bannerMap.get(unitId);
        if (adView != null) {
            adView.setVisibility(visible ? View.VISIBLE : View.INVISIBLE);
        }
    }

    private void destroyByUnitId(String unitId) {
        AdView adView = bannerMap.get(unitId);
        if (adView != null) {
            adView.removeAllViewsInLayout();
            adView.destroy();
            bannerMap.remove(unitId);
        }
    }

    private WindowManager getWindowManager(){
        return activity.getWindowManager();
    }

    private Resources getResources(){
        return activity.getResources();
    }
}