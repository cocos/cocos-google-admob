package com.cocos.admob.proto;

public abstract class IAdError extends Base{
    public String method;
    public String adError;

    public IAdError(String unitId) {
        super(unitId);
    }
}
