package com.cocos.admob.proto.interstitial;

import com.cocos.admob.proto.Base;
import com.cocos.admob.proto.ILoadAdError;

public class InterstitialAdLoadCalLBackNTF extends ILoadAdError {
    public InterstitialAdLoadCalLBackNTF(String unitId, String method) {
        super(unitId);
        this.method = method;
    }
    public InterstitialAdLoadCalLBackNTF(String unitId, String method, String loadAdError) {
        super(unitId);
        this.method = method;
        this.loadAdError = loadAdError;
    }
}
