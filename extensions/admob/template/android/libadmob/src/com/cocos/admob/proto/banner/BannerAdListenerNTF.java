package com.cocos.admob.proto.banner;

import com.cocos.admob.proto.ILoadAdError;

public class BannerAdListenerNTF extends ILoadAdError {

    public BannerAdListenerNTF(String unitId, String method, String loadAdError) {
        super(unitId);
        this.method = method;
        this.loadAdError = loadAdError;
    }

    public BannerAdListenerNTF(String unitId, String method) {
        super(unitId );
        this.method = method;
    }
}
