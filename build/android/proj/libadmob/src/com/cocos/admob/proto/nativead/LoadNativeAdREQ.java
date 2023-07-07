package com.cocos.admob.proto.nativead;

import com.cocos.admob.proto.Base;

public class LoadNativeAdREQ  extends Base {
    public final static String Small = "small";
    public final static String Medium = "medium";
    public String size;
    public LoadNativeAdREQ(String unitId) {
        super(unitId);
    }
}
