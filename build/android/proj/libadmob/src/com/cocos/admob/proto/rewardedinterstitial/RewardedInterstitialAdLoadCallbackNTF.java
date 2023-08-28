package com.cocos.admob.proto.rewardedinterstitial;

import com.cocos.admob.proto.rewarded.RewardedAdLoadCallbackNTF;

public class RewardedInterstitialAdLoadCallbackNTF extends RewardedAdLoadCallbackNTF {
    public RewardedInterstitialAdLoadCallbackNTF(String unitId, String method) {
        super(unitId, method);
    }

    public RewardedInterstitialAdLoadCallbackNTF(String unitId, String method, String loadAdError) {
        super(unitId, method, loadAdError);
    }
}
