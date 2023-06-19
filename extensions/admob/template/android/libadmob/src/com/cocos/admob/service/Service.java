package com.cocos.admob.service;

import com.cocos.admob.core.Bridge;
import com.cocos.lib.CocosActivity;

public abstract class Service {

    protected Bridge bridge;
    protected CocosActivity activity;

    public void init(Bridge bridge, CocosActivity activity) {
        this.bridge = bridge;
        this.activity = activity;
    }

    public void destroy() {
    }
}
