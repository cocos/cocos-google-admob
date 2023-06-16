package com.cocos.admob.proto.openapp;

import com.cocos.admob.proto.ILoadAdError;

public class AppOpenAdLoadCallbackNTF extends ILoadAdError {
    public  String method;
    public  String loadAdError;

    public AppOpenAdLoadCallbackNTF(String unitId) {
        super(unitId);
    }
}
