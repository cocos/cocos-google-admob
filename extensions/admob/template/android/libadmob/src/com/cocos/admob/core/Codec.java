package com.cocos.admob.core;

import com.google.gson.Gson;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

public class Codec {
    Map<String, Type> registerMap = new HashMap<>();
    public void register(String method, Type type){
        registerMap.put(method, type);
    }
    <T> T decode(String method, String data){
        return new Gson().fromJson(data, registerMap.get(method));
    }
    String encode(Object src){
        return new Gson().toJson(src);
    }
}