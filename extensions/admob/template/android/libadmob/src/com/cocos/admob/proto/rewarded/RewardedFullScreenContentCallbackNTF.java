package com.cocos.admob.proto.rewarded;

import com.cocos.admob.proto.Base;
import com.cocos.admob.proto.IAdError;

public class RewardedFullScreenContentCallbackNTF extends IAdError {
    public RewardedFullScreenContentCallbackNTF(String unitId, String method){
        super(unitId);
        this.method = method;
    }

    public RewardedFullScreenContentCallbackNTF(String unitId, String method, String adError){
        super(unitId);
        this.method = method;
        this.adError = adError;
    }
}
