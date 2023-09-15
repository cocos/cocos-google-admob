package com.cocos.admob.proto.rewardedinterstitial;

import com.cocos.admob.proto.IAdError;

public class RewardedInterstitialFullScreenContentCallbackNTF extends IAdError {
    public RewardedInterstitialFullScreenContentCallbackNTF(String unitId, String method) {
        super(unitId);
        this.method = method;
    }

    public RewardedInterstitialFullScreenContentCallbackNTF(String unitId, String method, String adError) {
        super(unitId);
        this.method = method;
        this.adError = adError;
    }
}
