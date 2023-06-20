package com.cocos.admob.proto.nativead;

import com.cocos.admob.proto.Base;

public class NativeAdListenerNTF extends Base  {
    public String method;
    public String adError;

    public NativeAdListenerNTF(String unitId, String method) {
        super(unitId);
    }

    public NativeAdListenerNTF(String unitId, String method, String adError) {
        super(unitId);
        this.method = method;
        this.adError = adError;
    }
}
