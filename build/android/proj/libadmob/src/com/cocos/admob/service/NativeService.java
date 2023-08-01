package com.cocos.admob.service;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;

import androidx.annotation.NonNull;

import com.cocos.admob.R;
import com.cocos.admob.AdServiceHub;
import com.cocos.admob.core.Bridge;
import com.cocos.admob.proto.nativead.DestroyNativeAdACK;
import com.cocos.admob.proto.nativead.DestroyNativeAdREQ;
import com.cocos.admob.proto.nativead.LoadNativeAdACK;
import com.cocos.admob.proto.nativead.LoadNativeAdREQ;
import com.cocos.admob.proto.nativead.NativeAdListenerNTF;
import com.cocos.admob.proto.nativead.NativeLoadedNTF;
import com.cocos.admob.proto.nativead.NativePaidEventNTF;
import com.cocos.lib.CocosActivity;
import com.google.android.ads.nativetemplates.NativeTemplateStyle;
import com.google.android.ads.nativetemplates.TemplateView;
import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdLoader;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdapterResponseInfo;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.nativead.NativeAd;
import com.google.android.gms.ads.nativead.NativeAdOptions;

public final class NativeService extends Service {

    private static final String TAG = "NativeService";

    private NativeAd nativeAd;

    @Override
    public void init(Bridge bridge, CocosActivity activity) {
        super.init(bridge, activity);

        bridge.getRoute().on(LoadNativeAdREQ.class.getSimpleName(), LoadNativeAdREQ.class, arg -> {
            LoadNativeAdREQ req = (LoadNativeAdREQ) arg;
            loadAd(req.unitId, req.size);
            bridge.sendToScript(LoadNativeAdACK.class.getSimpleName(), new LoadNativeAdACK(req.unitId));
        });

        bridge.getRoute().on(DestroyNativeAdREQ.class.getSimpleName(), DestroyNativeAdREQ.class, arg -> {
            DestroyNativeAdREQ req = (DestroyNativeAdREQ) arg;
            nativeAd.destroy();
            bridge.sendToScript(DestroyNativeAdACK.class.getSimpleName(), new LoadNativeAdACK(req.unitId));
        });
    }

    @Override
    public void destroy() {
        super.destroy();

        if (nativeAd != null) {
            nativeAd.destroy();
        }
    }

    public void loadAd(String unitId, String size) {
        AdLoader adLoader = new AdLoader.Builder(activity, unitId)
                .forNativeAd(new NativeAd.OnNativeAdLoadedListener() {
                    @Override
                    public void onNativeAdLoaded(NativeAd nativeAd) {
                        // Show the ad.
                        if (activity.isDestroyed()) {
                            Log.d(TAG, "onNativeAdLoaded: main activity is destroyed, so destroy the native ad.");
                            nativeAd.destroy();
                            return;
                        }

                        NativeService.this.nativeAd = nativeAd;

                        nativeAd.setOnPaidEventListener(adValue -> {
                            NativePaidEventNTF nativePaidEventNTF = new NativePaidEventNTF(unitId);

                            nativePaidEventNTF.valueMicros = adValue.getValueMicros();
                            nativePaidEventNTF.currencyCode = adValue.getCurrencyCode();
                            nativePaidEventNTF.precision = adValue.getPrecisionType();

                            AdapterResponseInfo loadedAdapterResponseInfo = nativeAd.getResponseInfo().
                                    getLoadedAdapterResponseInfo();
                            nativePaidEventNTF.adSourceName = loadedAdapterResponseInfo.getAdSourceName();
                            nativePaidEventNTF.adSourceId = loadedAdapterResponseInfo.getAdSourceId();
                            nativePaidEventNTF.adSourceInstanceName = loadedAdapterResponseInfo.getAdSourceInstanceName();
                            nativePaidEventNTF.adSourceInstanceId = loadedAdapterResponseInfo.getAdSourceInstanceId();

                            Bundle extras = nativeAd.getResponseInfo().getResponseExtras();
                            nativePaidEventNTF.mediationGroupName = extras.getString("mediation_group_name");
                            nativePaidEventNTF.mediationABTestName = extras.getString("mediation_ab_test_name");
                            nativePaidEventNTF.mediationABTestVariant = extras.getString("mediation_ab_test_variant");

                            bridge.sendToScript(NativePaidEventNTF.class.getSimpleName(), nativePaidEventNTF);
                        });

                        LayoutInflater layoutInflater = LayoutInflater.from(activity);
                        Window w = activity.getWindow();
                        ViewGroup vg = (ViewGroup) w.getDecorView();
                        View nativeAdView = null;
                        if (size.equals(LoadNativeAdREQ.Medium)) {
                            nativeAdView = layoutInflater.inflate(R.layout.native_medium_ad, vg);
                        } else {
                            nativeAdView = layoutInflater.inflate(R.layout.native_small_ad, vg);
                        }

                        NativeTemplateStyle styles = new
                                NativeTemplateStyle.Builder()
                                .build();
                        TemplateView template = nativeAdView.findViewById(R.id.native_ad_type);
                        template.setStyles(styles);
                        template.setNativeAd(nativeAd);

                        bridge.sendToScript(NativeLoadedNTF.class.getSimpleName(), new NativeLoadedNTF(unitId));
                    }
                })
                .withAdListener(new AdListener() {
                                    @Override
                                    public void onAdClicked() {
                                        super.onAdClicked();
                                        bridge.sendToScript(NativeAdListenerNTF.class.getSimpleName(), new NativeAdListenerNTF(unitId, "onAdClicked"));
                                    }

                                    @Override
                                    public void onAdClosed() {
                                        super.onAdClosed();
                                        bridge.sendToScript(NativeAdListenerNTF.class.getSimpleName(), new NativeAdListenerNTF(unitId, "onAdClosed"));
                                    }

                                    @Override
                                    public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                                        super.onAdFailedToLoad(loadAdError);
                                        bridge.sendToScript(NativeAdListenerNTF.class.getSimpleName(), new NativeAdListenerNTF(unitId, "onAdFailedToLoad", loadAdError.toString()));
                                    }

                                    @Override
                                    public void onAdImpression() {
                                        super.onAdImpression();
                                        bridge.sendToScript(NativeAdListenerNTF.class.getSimpleName(), new NativeAdListenerNTF(unitId, "onAdImpression"));
                                    }

                                    @Override
                                    public void onAdLoaded() {
                                        super.onAdLoaded();
                                        bridge.sendToScript(NativeAdListenerNTF.class.getSimpleName(), new NativeAdListenerNTF(unitId, "onAdLoaded"));
                                    }

                                    @Override
                                    public void onAdOpened() {
                                        super.onAdOpened();
                                        bridge.sendToScript(NativeAdListenerNTF.class.getSimpleName(), new NativeAdListenerNTF(unitId, "onAdOpened"));
                                    }

                                    @Override
                                    public void onAdSwipeGestureClicked() {
                                        super.onAdSwipeGestureClicked();
                                        bridge.sendToScript(NativeAdListenerNTF.class.getSimpleName(), new NativeAdListenerNTF(unitId, "onAdSwipeGestureClicked"));
                                    }
                                }
                )
                .withNativeAdOptions(new NativeAdOptions.Builder()
                        // Methods in the NativeAdOptions.Builder class can be
                        // used here to specify individual options settings.
                        .build())
                .build();


        adLoader.loadAd(new AdRequest.Builder()
                .setRequestAgent(AdServiceHub.extensionVersion)
                .build());
    }
}