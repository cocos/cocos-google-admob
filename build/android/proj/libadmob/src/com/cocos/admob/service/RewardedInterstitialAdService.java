package com.cocos.admob.service;

import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;

import com.cocos.admob.AdServiceHub;
import com.cocos.admob.core.Bridge;
import com.cocos.admob.proto.rewardedinterstitial.LoadRewardedInterstitialAdACK;
import com.cocos.admob.proto.rewardedinterstitial.LoadRewardedInterstitialAdREQ;
import com.cocos.admob.proto.rewardedinterstitial.OnUserEarnedRewardedInterstitialListenerNTF;
import com.cocos.admob.proto.rewardedinterstitial.RewardedInterstitialAdLoadCallbackNTF;
import com.cocos.admob.proto.rewardedinterstitial.RewardedInterstitialFullScreenContentCallbackNTF;
import com.cocos.admob.proto.rewardedinterstitial.RewardedInterstitialPaidEventNTF;
import com.cocos.admob.proto.rewardedinterstitial.ShowRewardedInterstitialAdACK;
import com.cocos.admob.proto.rewardedinterstitial.ShowRewardedInterstitialAdREQ;
import com.cocos.lib.CocosActivity;
import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdapterResponseInfo;
import com.google.android.gms.ads.FullScreenContentCallback;
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

    private RewardedInterstitialAd rewardedInterstitialAd;

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

    private void loadAd(String unitId) {
        this.unitId = unitId;
        RewardedInterstitialAd.load(activity, unitId,
                new AdRequest.Builder()
                        .setRequestAgent(AdServiceHub.extensionVersion)
                        .build(), new RewardedInterstitialAdLoadCallback() {
                    @Override
                    public void onAdLoaded(RewardedInterstitialAd ad) {
                        Log.d(TAG, "Ad was loaded.");
                        rewardedInterstitialAd = ad;
                        bridge.sendToScript(RewardedInterstitialAdLoadCallbackNTF.class.getSimpleName(), new RewardedInterstitialAdLoadCallbackNTF(unitId, "onAdLoaded"));

                       rewardedInterstitialAd.setOnPaidEventListener(adValue -> {
                           RewardedInterstitialPaidEventNTF rewardedInterstitialPaidEventNTF = new RewardedInterstitialPaidEventNTF(unitId);

                           rewardedInterstitialPaidEventNTF.valueMicros = adValue.getValueMicros();
                           rewardedInterstitialPaidEventNTF.currencyCode = adValue.getCurrencyCode();
                           rewardedInterstitialPaidEventNTF.precision = adValue.getPrecisionType();

                           AdapterResponseInfo loadedAdapterResponseInfo = rewardedInterstitialAd.getResponseInfo().
                                   getLoadedAdapterResponseInfo();
                           rewardedInterstitialPaidEventNTF.adSourceName = loadedAdapterResponseInfo.getAdSourceName();
                           rewardedInterstitialPaidEventNTF.adSourceId = loadedAdapterResponseInfo.getAdSourceId();
                           rewardedInterstitialPaidEventNTF.adSourceInstanceName = loadedAdapterResponseInfo.getAdSourceInstanceName();
                           rewardedInterstitialPaidEventNTF.adSourceInstanceId = loadedAdapterResponseInfo.getAdSourceInstanceId();

                           Bundle extras = rewardedInterstitialAd.getResponseInfo().getResponseExtras();
                           rewardedInterstitialPaidEventNTF.mediationGroupName = extras.getString("mediation_group_name");
                           rewardedInterstitialPaidEventNTF.mediationABTestName = extras.getString("mediation_ab_test_name");
                           rewardedInterstitialPaidEventNTF.mediationABTestVariant = extras.getString("mediation_ab_test_variant");

                           bridge.sendToScript(RewardedInterstitialPaidEventNTF.class.getSimpleName(), rewardedInterstitialPaidEventNTF);
                       });

                        rewardedInterstitialAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                            @Override
                            public void onAdClicked() {
                                super.onAdClicked();

                                bridge.sendToScript(RewardedInterstitialFullScreenContentCallbackNTF.class.getSimpleName(),
                                        new RewardedInterstitialFullScreenContentCallbackNTF(unitId, "onAdClicked"));
                            }

                            @Override
                            public void onAdDismissedFullScreenContent() {
                                super.onAdDismissedFullScreenContent();
                                rewardedInterstitialAd = null;
                                bridge.sendToScript(RewardedInterstitialFullScreenContentCallbackNTF.class.getSimpleName(),
                                        new RewardedInterstitialFullScreenContentCallbackNTF(unitId, "onAdDismissedFullScreenContent"));
                            }

                            @Override
                            public void onAdFailedToShowFullScreenContent(@NonNull AdError adError) {
                                super.onAdFailedToShowFullScreenContent(adError);
                                rewardedInterstitialAd = null;
                                bridge.sendToScript(RewardedInterstitialFullScreenContentCallbackNTF.class.getSimpleName(),
                                        new RewardedInterstitialFullScreenContentCallbackNTF(unitId, "onAdFailedToShowFullScreenContent"));
                            }

                            @Override
                            public void onAdImpression() {
                                super.onAdImpression();
                                bridge.sendToScript(RewardedInterstitialFullScreenContentCallbackNTF.class.getSimpleName(),
                                        new RewardedInterstitialFullScreenContentCallbackNTF(unitId, "onAdImpression"));
                            }

                            @Override
                            public void onAdShowedFullScreenContent() {
                                super.onAdShowedFullScreenContent();
                                bridge.sendToScript(RewardedInterstitialFullScreenContentCallbackNTF.class.getSimpleName(),
                                        new RewardedInterstitialFullScreenContentCallbackNTF(unitId, "onAdShowedFullScreenContent"));
                            }
                        });
                    }

                    @Override
                    public void onAdFailedToLoad(LoadAdError loadAdError) {
                        Log.d(TAG, loadAdError.toString());
                        rewardedInterstitialAd = null;
                        bridge.sendToScript(RewardedInterstitialAdLoadCallbackNTF.class.getSimpleName(), new RewardedInterstitialAdLoadCallbackNTF(unitId, "onAdFailedToLoad", loadAdError.toString()));
                    }
                });
    }

    private void showAd() {
        if (rewardedInterstitialAd == null) {
            return;
        }

        rewardedInterstitialAd.show(activity, new OnUserEarnedRewardListener() {
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