package com.cocos.admob.service;

import android.app.Activity;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.cocos.admob.AdManager;
import com.cocos.admob.core.Bridge;
import com.cocos.admob.core.IScriptHandler;
import com.cocos.admob.proto.rewarded.LoadRewardedAdACK;
import com.cocos.admob.proto.rewarded.LoadRewardedAdREQ;
import com.cocos.admob.proto.rewarded.OnUserEarnedRewardListenerNTF;
import com.cocos.admob.proto.rewarded.RewardedAdLoadCallbackNTF;
import com.cocos.admob.proto.rewarded.RewardedFullScreenContentCallbackNTF;
import com.cocos.admob.proto.rewarded.ShowRewardedAdACK;
import com.cocos.admob.proto.rewarded.ShowRewardedAdREQ;
import com.cocos.lib.CocosActivity;
import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.OnUserEarnedRewardListener;
import com.google.android.gms.ads.rewarded.RewardItem;
import com.google.android.gms.ads.rewarded.RewardedAd;
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback;


/**
 * Internal class for rewarded ads.
 */
public final class RewardedAdService  extends  Service{

    private static final String TAG = "RewardedAdService";

    RewardedAd mRewardedAd;
    String unitId;

    public void init(Bridge bridge, CocosActivity activity) {
        super.init(bridge, activity);

        bridge.getRoute().on(LoadRewardedAdREQ.class.getSimpleName(), LoadRewardedAdREQ.class, new IScriptHandler() {
            @Override
            public void onMessage(Object arg) {
                LoadRewardedAdREQ req = (LoadRewardedAdREQ) arg;
                loadAd(req.unitId);
                LoadRewardedAdACK ack = new LoadRewardedAdACK(unitId);
                bridge.sendToScript(LoadRewardedAdACK.class.getSimpleName(), ack);
            }
        });

        bridge.getRoute().on(ShowRewardedAdREQ.class.getSimpleName(), ShowRewardedAdREQ.class, new IScriptHandler() {
            @Override
            public void onMessage(Object arg) {
                ShowRewardedAdREQ req = (ShowRewardedAdREQ) arg;
                showAd();
                ShowRewardedAdACK ack = new ShowRewardedAdACK(unitId);
                bridge.sendToScript(ShowRewardedAdACK.class.getSimpleName(), ack);
            }
        });
    }

    public void destroy() {

    }

    private void loadAd(String unitId) {
        this.unitId = unitId;
        AdRequest adRequest = new AdRequest.Builder()
                .setRequestAgent(AdManager.engineVersion)
                .build();
        RewardedAd.load(activity, unitId,
                adRequest, new RewardedAdLoadCallback() {
                    @Override
                    public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                        // Handle the error.
                        Log.d(TAG, loadAdError.toString());
                        Toast.makeText(activity, "Rewarded ad failed to load.", Toast.LENGTH_SHORT).show();
                        mRewardedAd = null;
                        bridge.sendToScript(RewardedAdLoadCallbackNTF.class.getSimpleName(), new RewardedAdLoadCallbackNTF(unitId, "onAdFailedToLoad", loadAdError.toString()));
                    }

                    @Override
                    public void onAdLoaded(@NonNull RewardedAd ad) {
                        mRewardedAd = ad;
                        Log.d(TAG, "Ad was loaded.");
                        Toast.makeText(activity, "Rewarded ad loaded.", Toast.LENGTH_SHORT).show();
                        bridge.sendToScript(RewardedAdLoadCallbackNTF.class.getSimpleName(), new RewardedAdLoadCallbackNTF(unitId, "onAdLoaded"));

                        mRewardedAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                            @Override
                            public void onAdClicked() {
                                // Called when a click is recorded for an ad.
                                Log.d(TAG, "Ad was clicked.");
                                bridge.sendToScript(RewardedFullScreenContentCallbackNTF.class.getSimpleName(), new RewardedFullScreenContentCallbackNTF(unitId, "onAdClicked"));
                            }

                            @Override
                            public void onAdDismissedFullScreenContent() {
                                // Called when ad is dismissed.
                                // Set the ad reference to null so you don't show the ad a second time.
                                Log.d(TAG, "Ad dismissed fullscreen content.");
                                mRewardedAd = null;
                                bridge.sendToScript(RewardedFullScreenContentCallbackNTF.class.getSimpleName(), new RewardedFullScreenContentCallbackNTF(unitId, "onAdDismissedFullScreenContent"));
                            }

                            @Override
                            public void onAdFailedToShowFullScreenContent(AdError adError) {
                                // Called when ad fails to show.
                                Log.e(TAG, "Ad failed to show fullscreen content.");
                                mRewardedAd = null;
                                bridge.sendToScript(RewardedFullScreenContentCallbackNTF.class.getSimpleName(), new RewardedFullScreenContentCallbackNTF(unitId, "onAdFailedToShowFullScreenContent", adError.toString()));
                            }

                            @Override
                            public void onAdImpression() {
                                // Called when an impression is recorded for an ad.
                                Log.d(TAG, "Ad recorded an impression.");
                                bridge.sendToScript(RewardedFullScreenContentCallbackNTF.class.getSimpleName(), new RewardedFullScreenContentCallbackNTF(unitId, "onAdImpression"));
                            }

                            @Override
                            public void onAdShowedFullScreenContent() {
                                // Called when ad is shown.
                                Log.d(TAG, "Ad showed fullscreen content.");
                                bridge.sendToScript(RewardedFullScreenContentCallbackNTF.class.getSimpleName(), new RewardedFullScreenContentCallbackNTF(unitId, "onAdShowedFullScreenContent"));
                            }
                        });
                    }
                });
    }

    private void showAd() {
        Log.d(TAG, "showAd: ");
        if (mRewardedAd == null) {
            Log.d(TAG, "The rewarded ad wasn't ready yet.");
            return;
        }

        Activity activityContext = activity;
        mRewardedAd.show(activityContext, new OnUserEarnedRewardListener() {
            @Override
            public void onUserEarnedReward(@NonNull RewardItem rewardItem) {
                // Handle the reward.
                Log.d(TAG, "The user earned the reward.");
                int rewardAmount = rewardItem.getAmount();
                String rewardType = rewardItem.getType();
                bridge.sendToScript(OnUserEarnedRewardListenerNTF.class.getSimpleName(), new OnUserEarnedRewardListenerNTF(unitId, rewardType, rewardAmount));
            }
        });
    }
}