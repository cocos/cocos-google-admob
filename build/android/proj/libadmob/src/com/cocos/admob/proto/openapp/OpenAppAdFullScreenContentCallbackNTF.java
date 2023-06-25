package com.cocos.admob.proto.openapp;

import com.cocos.admob.proto.Base;
import com.cocos.admob.proto.IAdError;

public class OpenAppAdFullScreenContentCallbackNTF extends IAdError {
    public OpenAppAdFullScreenContentCallbackNTF(String unitId, String method) {
        super(unitId);
        this.method = method;
    }

    public OpenAppAdFullScreenContentCallbackNTF(String unitId, String method, String adError) {
        super(unitId);
        this.method = method;
        this.adError = adError;
    }
}
