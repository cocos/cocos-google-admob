package com.cocos.admob.proto.banner;

import com.cocos.admob.proto.Base;

public final class LoadBannerREQ extends Base {

    public String bannerSize;
    public String[] alignments;

    public LoadBannerREQ(String unitId) {
        super(unitId);
    }
}
