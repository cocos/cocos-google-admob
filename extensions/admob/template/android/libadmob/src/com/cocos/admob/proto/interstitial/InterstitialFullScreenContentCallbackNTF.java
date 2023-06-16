package com.cocos.admob.proto.interstitial;

import com.cocos.admob.proto.Base;
import com.cocos.admob.proto.IAdError;

public class InterstitialFullScreenContentCallbackNTF extends IAdError {
    public InterstitialFullScreenContentCallbackNTF(String unitId, String method){
        super(unitId);
        this.method = method;
    }
    public InterstitialFullScreenContentCallbackNTF(String unitId, String method, String adError){
        super(unitId);
        this.method = method;
        this.adError = adError;
    }
}
