package com.cocos.admob.proto.appopen;

import com.cocos.admob.proto.Base;

public class IsAdAvailableACK extends Base {
    public  boolean valid;

    public IsAdAvailableACK(String unitId) {
        super(unitId);
    }

    public IsAdAvailableACK(String unitId, boolean valid) {
        super(unitId);
        this.valid = valid;
    }
}
