package com.cocos.admob.proto.appopen;

import com.cocos.admob.proto.IAdError;
import com.google.android.gms.ads.AdError;

public class FullScreenContentCallbackNTF extends IAdError {

    public FullScreenContentCallbackNTF(String unitId, String method){
        super(unitId);
        this.method = method;
    }
    public  FullScreenContentCallbackNTF(String unitId, String method, String adError){
        super(unitId);
        this.method = method;
        this.adError = adError;
    }
}
