package com.cocos.admob.proto.banner;

import com.cocos.admob.proto.Base;

public final class LoadBannerREQ extends Base {

    public static final String Builtin = "Builtin";
    public static final String Landscape = "Landscape";
    public static final String Portrait = "Portrait";
    public static final String Current = "Current";

    public String bannerSizeType;
    public String bannerSize;
    public String[] alignments;

    public LoadBannerREQ(String unitId) {
        super(unitId);
    }
}
