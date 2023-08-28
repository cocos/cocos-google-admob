package com.cocos.admob.proto.banner;

import com.cocos.admob.proto.Base;

public class ShowBannerREQ extends Base {
    public boolean visible;
    public ShowBannerREQ(String unitId) {
        super(unitId);
    }
}
