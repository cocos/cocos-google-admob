package com.cocos.admob.service;


import android.app.Activity;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.RelativeLayout;

import androidx.annotation.NonNull;

import com.cocos.admob.AdManager;
import com.cocos.admob.core.Bridge;
import com.cocos.admob.proto.banner.BannerAdListenerNTF;
import com.cocos.admob.proto.banner.CreateBannerViewACK;
import com.cocos.admob.proto.banner.CreateBannerViewREQ;
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
import com.google.android.gms.ads.LoadAdError;

import java.util.HashMap;

/**
 * Internal class for banner ads.
 */
public final class BannerService extends Service {
    private static final String TAG = "BannerService";
    HashMap<String, AdView> bannerMap = new HashMap<>();
    public void init(Bridge bridge, CocosActivity activity) {
        super.init(bridge, activity);
        bridge.getRoute().on(CreateBannerViewREQ.class.getSimpleName(), CreateBannerViewREQ.class, arg -> {
            CreateBannerViewREQ req = (CreateBannerViewREQ) arg;
            if (!bannerMap.containsKey(req.unitId)) {
                this.createBannerView(req.unitId);
            }
            bridge.sendToScript(CreateBannerViewACK.class.getSimpleName(), new CreateBannerViewACK(req.unitId));
        });

        bridge.getRoute().on(LoadBannerREQ.class.getSimpleName(), LoadBannerREQ.class, arg -> {
            LoadBannerREQ req = (LoadBannerREQ) arg;
            String unitId = req.unitId;
            LoadBannerACK ack = new LoadBannerACK(unitId);
            String method = LoadBannerACK.class.getSimpleName();
            ack.unitId = req.unitId;
            loadBannerAd(req.unitId, new AdListener() {
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
    }

    private AdView createBannerView(String unitId) {
        Window w = activity.getWindow();
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
        RelativeLayout.LayoutParams bannerLp = new RelativeLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
        );
        bannerLp.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM);
        bannerLp.addRule(RelativeLayout.CENTER_HORIZONTAL);
        rl.addView(adview);

        adview.setAdUnitId(unitId);
        adview.setAdSize(AdSize.BANNER);
        adview.setLayoutParams(bannerLp);
        bannerMap.put(unitId, adview);
        return adview;
    }

    private void loadBannerAd(String unitId, AdListener adListener) {
        AdView adview = bannerMap.get(unitId);
        // Create an ad request.
        AdRequest adRequest = new AdRequest.Builder()
                .setRequestAgent(AdManager.engineVersion)
                .build();
        adview.setAdListener(adListener);
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
}