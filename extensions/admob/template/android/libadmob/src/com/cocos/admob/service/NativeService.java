package com.cocos.admob.service;


import android.util.Log;

import com.cocos.admob.AdManager;
import com.google.android.gms.ads.AdListener;
import com.google.android.gms.ads.AdLoader;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.nativead.NativeAd;
import com.google.android.gms.ads.nativead.NativeAdOptions;

import java.util.List;
import java.util.Vector;

public final class NativeService extends Service {

    private static final String TAG = "NativeService";

    private String unitId;

    private int mLoadedCount;

    private List<NativeAd> mNativeAdList = new Vector<>();

    @Override
    public void destroy() {
        super.destroy();
        for (NativeAd ad : mNativeAdList) {
            ad.destroy();
        }
    }

    public void loadAd(int adCount) {
        mLoadedCount = 0;
        destroy();
        AdLoader adLoader = new AdLoader.Builder(activity, "ca-app-pub-3940256099942544/2247696110")
                .forNativeAd(new NativeAd.OnNativeAdLoadedListener() {
                    @Override
                    public void onNativeAdLoaded(NativeAd nativeAd) {
                        // Show the ad.
                        if (activity.isDestroyed()) {
                            Log.d(TAG, "onNativeAdLoaded: main activity is destroyed, so destory the native ad.");
                            nativeAd.destroy();
                            return;
                        }

                        mNativeAdList.add(nativeAd);
                    }
                })
                .withAdListener(new AdListener() {
                    @Override
                    public void onAdFailedToLoad(LoadAdError adError) {
                        // Handle the failure by logging, altering the UI, and so on.
                        mLoadedCount++;
                        Log.d(TAG, "onAdFailedToLoad: adError = " + adError + ", loaded count = " + mLoadedCount);
                    }
                })
                .withNativeAdOptions(new NativeAdOptions.Builder()
                        // Methods in the NativeAdOptions.Builder class can be
                        // used here to specify individual options settings.
                        .build())
                .build();


        if (adCount > 0) {
            adLoader.loadAds(new AdRequest.Builder()
                    .setRequestAgent(AdManager.engineVersion)
                    .build(), adCount);
        } else {
            adLoader.loadAd(new AdRequest.Builder()
                    .setRequestAgent(AdManager.engineVersion)
                    .build());
        }
    }
}