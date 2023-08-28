package com.cocos.admob;

import android.util.Log;

import com.cocos.admob.core.Bridge;
import com.cocos.admob.core.Codec;
import com.cocos.admob.proto.VersionREQ;
import com.cocos.admob.service.AppOpenAdService;
import com.cocos.admob.service.BannerService;
import com.cocos.admob.service.InterstitialAdService;
import com.cocos.admob.service.NativeService;
import com.cocos.admob.service.RewardedAdService;
import com.cocos.admob.service.RewardedInterstitialAdService;
import com.cocos.lib.CocosActivity;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.initialization.InitializationStatus;
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener;

public final class AdServiceHub {

    private static final String TAG = "AdManager";
    private static AdServiceHub instance = new AdServiceHub();

    public static AdServiceHub instance() {

        return instance;
    }
    private CocosActivity activity = null;

    public CocosActivity getActivity() {

        return activity;
    }
    private boolean initialized = false;
    private Bridge bridge = new Bridge();
    private BannerService bannerService = new BannerService();
    private AppOpenAdService appOpenAdService = new AppOpenAdService();
    private InterstitialAdService interstitialAdService = new InterstitialAdService();
    private RewardedAdService rewardedAdService = new RewardedAdService();

    private RewardedInterstitialAdService rewardedInterstitialAdService = new RewardedInterstitialAdService();
    private NativeService nativeService = new NativeService();

    public static String extensionVersion;

    public void init(CocosActivity activity) {
        Log.d(TAG, String.format("onCreate {0}", initialized));
        this.activity = activity;
        initialized = false;
        MobileAds.initialize(this.activity, new OnInitializationCompleteListener() {
            @Override
            public void onInitializationComplete(InitializationStatus initializationStatus) {
                Log.d(TAG, "onInitializationComplete: " + initializationStatus);
                initialized = true;
            }
        });
        bridge.init(this, new Codec());
        bridge.getRoute().on(VersionREQ.class.getSimpleName(), VersionREQ.class, arg -> {
            VersionREQ req = (VersionREQ)arg;
            extensionVersion = req.engineVersion;
        });
        bannerService.init(bridge, activity);
        appOpenAdService.init(bridge, activity);
        interstitialAdService.init(bridge, activity);
        rewardedAdService.init(bridge, activity);
        rewardedInterstitialAdService.init(bridge,activity);
        nativeService.init(bridge, activity);
    }

    public void destroy() {
        bannerService.destroy();
        appOpenAdService.destroy();
        interstitialAdService.destroy();
        rewardedAdService.destroy();
        nativeService.destroy();
        rewardedInterstitialAdService.destroy();
        activity = null;
        bridge.destroy();
    }

    public void sendToUIThread(Runnable runnable){
        activity.runOnUiThread(runnable);
    }
}
