package com.cocos.admob.core;

import android.util.Log;

import com.cocos.admob.AdManager;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

public class Route {
    private static final String TAG = "Route";
    private Codec codec = null;

    public Codec codec() {
        return codec;
    }

    private Map<String, IScriptHandler> handlers = new HashMap<>();
    AdManager adManager;

    public void init(AdManager adManager, Codec codec) {
        this.adManager = adManager;
        this.codec = codec;
    }

    public void destroy() {
        handlers.clear();
    }

    public void on(String method, Type type, IScriptHandler handler) {
        Log.d(TAG, "registerHandler: " + method);
        codec.register(method, type);
        handlers.put(method, handler);
    }

    public void off(String method) {
        if (!handlers.containsKey(method)) {
            return;
        }
        handlers.remove(method);
    }

    public void dispatch(String arg0, String arg1) {
        Log.d(TAG, "dispatch: " + arg0);
        adManager.sendToUIThread(new Runnable() {
            @Override
            public void run() {
                if (!handlers.containsKey(arg0)) {
                    Log.e(TAG, "missing handler: " + arg0);
                    return;
                }
                IScriptHandler handler = handlers.get(arg0);
                if (handler == null) {
                    Log.d(TAG, "could not find method handler: " + arg0);
                }
                handler.onMessage(codec.decode(arg0, arg1));
            }
        });
    }
}
