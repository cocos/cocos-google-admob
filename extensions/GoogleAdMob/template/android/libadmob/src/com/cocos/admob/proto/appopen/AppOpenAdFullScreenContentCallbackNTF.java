package com.cocos.admob.proto.appopen;

import com.cocos.admob.proto.IAdError;

public class AppOpenAdFullScreenContentCallbackNTF extends IAdError {
    public AppOpenAdFullScreenContentCallbackNTF(String unitId, String method) {
        super(unitId);
        this.method = method;
    }

    public AppOpenAdFullScreenContentCallbackNTF(String unitId, String method, String adError) {
        super(unitId);
        this.method = method;
        this.adError = adError;
    }
}
