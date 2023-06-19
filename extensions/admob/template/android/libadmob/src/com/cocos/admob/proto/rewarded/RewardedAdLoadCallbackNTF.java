package com.cocos.admob.proto.rewarded;

import com.cocos.admob.proto.Base;
import com.cocos.admob.proto.ILoadAdError;

public class RewardedAdLoadCallbackNTF extends ILoadAdError {
    public RewardedAdLoadCallbackNTF(String unitId, String method) {
        super(unitId);
        this.method = method;
    }

    public RewardedAdLoadCallbackNTF(String unitId, String method, String loadAdError) {
        super(unitId);
        this.method = method;
        this.loadAdError = loadAdError;
    }
}
