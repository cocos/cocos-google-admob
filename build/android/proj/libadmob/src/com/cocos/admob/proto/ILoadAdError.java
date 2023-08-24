package com.cocos.admob.proto;

public abstract class ILoadAdError extends Base {
    public String method;
    public String loadAdError;

    public ILoadAdError(String unitId) {
        super(unitId);
    }
}
