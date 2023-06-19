package com.cocos.admob.service;

import android.util.Log;

import androidx.annotation.NonNull;

import com.cocos.admob.AdManager;
import com.cocos.admob.core.Bridge;
import com.cocos.admob.proto.rewardedinterstitial.LoadRewardedInterstitialAdACK;
import com.cocos.admob.proto.rewardedinterstitial.LoadRewardedInterstitialAdREQ;
import com.cocos.admob.proto.rewardedinterstitial.OnUserEarnedRewardedInterstitialListenerNTF;
import com.cocos.admob.proto.rewardedinterstitial.RewardedInterstitialAdLoadCallbackNTF;
import com.cocos.admob.proto.rewardedinterstitial.ShowRewardedInterstitialAdACK;
import com.cocos.admob.proto.rewardedinterstitial.ShowRewardedInterstitialAdREQ;
import com.cocos.lib.CocosActivity;
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

    private static final String TAG = "RewardedInterService";

    private String unitId;

    private RewardedInterstitialAd mRewardedInterstitialAd;

    @Override
    public void init(Bridge bridge, CocosActivity activity) {
        super.init(bridge, activity);

        bridge.getRoute().on(LoadRewardedInterstitialAdREQ.class.getSimpleName(), LoadRewardedInterstitialAdREQ.class, arg -> {
            LoadRewardedInterstitialAdREQ req = (LoadRewardedInterstitialAdREQ) arg;
            loadAd(req.unitId);
            LoadRewardedInterstitialAdACK ack = new LoadRewardedInterstitialAdACK(unitId);
            bridge.sendToScript(LoadRewardedInterstitialAdACK.class.getSimpleName(), ack);
        });

        bridge.getRoute().on(ShowRewardedInterstitialAdREQ.class.getSimpleName(), ShowRewardedInterstitialAdREQ.class, arg -> {
            ShowRewardedInterstitialAdREQ req = (ShowRewardedInterstitialAdREQ) arg;
            showAd();
            ShowRewardedInterstitialAdACK ack = new ShowRewardedInterstitialAdACK(unitId);
            bridge.sendToScript(ShowRewardedInterstitialAdACK.class.getSimpleName(), ack);
        });
    }

    @Override
    public void destroy() {
        super.destroy();
    }

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
                        bridge.sendToScript(RewardedInterstitialAdLoadCallbackNTF.class.getSimpleName(), new RewardedInterstitialAdLoadCallbackNTF(unitId, "onAdLoaded"));
                    }

                    @Override
                    public void onAdFailedToLoad(LoadAdError loadAdError) {
                        Log.d(TAG, loadAdError.toString());
                        mRewardedInterstitialAd = null;
                        bridge.sendToScript(RewardedInterstitialAdLoadCallbackNTF.class.getSimpleName(), new RewardedInterstitialAdLoadCallbackNTF(unitId, "onAdFailedToLoad", loadAdError.toString()));
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
                bridge.sendToScript(OnUserEarnedRewardedInterstitialListenerNTF.class.getSimpleName(),
                        new OnUserEarnedRewardedInterstitialListenerNTF(unitId,
                                rewardItem.getType(),
                                rewardItem.getAmount()));
            }
        });
    }
}