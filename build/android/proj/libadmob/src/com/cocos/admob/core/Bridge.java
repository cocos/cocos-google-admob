package com.cocos.admob.core;

import android.util.Log;

import com.cocos.admob.AdServiceHub;
import com.cocos.lib.JsbBridge;

public class Bridge {
    private static final String TAG = "Bridge";

    private Route route = new Route();

    private Codec codec = null;

    public Route getRoute() {
        return route;
    }

    public Bridge() {

    }

    public void init(AdServiceHub adServiceHub, Codec codec) {
        Log.d(TAG, "init");
        this.codec = codec;
        route.init(adServiceHub, codec);
        overwriteCallback();
    }

    public void destroy() {
        Log.d(TAG, "destroy");
        route.destroy();
    }

    private void overwriteCallback() {
        Log.d(TAG, "overwriteCallback: ");
        JsbBridge.setCallback(new JsbBridge.ICallback() {
            @Override
            public void onScript(String arg0, String arg1) {
                Log.d(TAG, "onScript: " + arg0 + " | " + arg1);
                route.dispatch(arg0, arg1);
            }
        });
    }

    public void sendToScript(String arg0, Object src) {
        Log.d(TAG, "sendToScript, message: method: " + arg0);
        JsbBridge.sendToScript(arg0, codec.encode(src));
    }
}
