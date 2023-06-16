package com.cocos.admob.service;

import android.util.Log;

import androidx.annotation.NonNull;

import com.cocos.admob.AdManager;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.OnUserEarnedRewardListener;
import com.google.android.gms.ads.rewarded.RewardItem;
import com.google.android.gms.ads.rewardedinterstitial.RewardedInterstitialAd;
import com.google.android.gms.ads.rewardedinterstitial.RewardedInterstitialAdLoadCallback;

/**
 * Internal class for rewarded interstitial ads.
 */
public final class RewardedInterstitialAdService extends Service {

    private static final String TAG = "RewardedInterstitialAdService";

    private String unitId;

    private RewardedInterstitialAd mRewardedInterstitialAd;

    private void loadAd(String unitId) {
        this.unitId = unitId;
        RewardedInterstitialAd.load(activity, unitId,
                new AdRequest.Builder()
                        .setRequestAgent(AdManager.engineVersion)
                        .build(), new RewardedInterstitialAdLoadCallback() {
                    @Override
                    public void onAdLoaded(RewardedInterstitialAd ad) {
                        Log.d(TAG, "Ad was loaded.");
                        mRewardedInterstitialAd = ad;

                        showAd();
                    }

                    @Override
                    public void onAdFailedToLoad(LoadAdError loadAdError) {
                        Log.d(TAG, loadAdError.toString());
                        mRewardedInterstitialAd = null;
                    }
                });
    }

    private void showAd() {
        if (mRewardedInterstitialAd == null) {
            return;
        }

        mRewardedInterstitialAd.show(activity, new OnUserEarnedRewardListener() {
            @Override
            public void onUserEarnedReward(@NonNull RewardItem rewardItem) {
                Log.d(TAG, "onUserEarnedReward: ");
            }
        });
    }
}