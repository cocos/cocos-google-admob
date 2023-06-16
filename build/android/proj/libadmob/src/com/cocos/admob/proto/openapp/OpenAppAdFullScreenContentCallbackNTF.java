package com.cocos.admob.proto.openapp;

import com.cocos.admob.proto.Base;

public class OpenAppAdFullScreenContentCallbackNTF extends Base {
    public String method;
    public String adError;

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
