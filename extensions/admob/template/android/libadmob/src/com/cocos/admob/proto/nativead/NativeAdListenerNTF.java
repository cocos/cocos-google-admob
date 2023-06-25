package com.cocos.admob.proto.nativead;

import com.cocos.admob.proto.Base;
import com.cocos.admob.proto.IAdError;

public class NativeAdListenerNTF extends IAdError {
    public NativeAdListenerNTF(String unitId, String method) {
        super(unitId);
    }

    public NativeAdListenerNTF(String unitId, String method, String adError) {
        super(unitId);
        this.method = method;
        this.adError = adError;
    }
}
