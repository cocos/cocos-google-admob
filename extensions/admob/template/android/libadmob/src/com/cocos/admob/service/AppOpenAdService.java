package com.cocos.admob.service;

import android.app.Activity;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.cocos.admob.AdManager;
import com.cocos.admob.AdMobApplication;
import com.cocos.admob.core.Bridge;
import com.cocos.admob.core.IScriptHandler;
import com.cocos.admob.proto.openapp.AppOpenAdLoadCallbackNTF;
import com.cocos.admob.proto.openapp.IsAdAvailableACK;
import com.cocos.admob.proto.openapp.IsAdAvailableREQ;
import com.cocos.admob.proto.openapp.LoadOpenAppAdACK;
import com.cocos.admob.proto.openapp.LoadOpenAppAdREQ;
import com.cocos.admob.proto.openapp.OpenAppAdFullScreenContentCallbackNTF;
import com.cocos.admob.proto.openapp.ShowOpenAppAdCompleteNTF;
import com.cocos.admob.proto.openapp.ShowOpenAppAdREQ;
import com.cocos.lib.CocosActivity;
import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.appopen.AppOpenAd;

import java.util.Date;


/**
 * Inner class that loads and shows app open ads.
 */

public final class AppOpenAdService extends Service {

    private static final String TAG = "AppOpenAdService";
    // Ad mob test unit id, DO NOT use it in the deploy version
    //private static final String AD_UNIT_ID = "ca-app-pub-3940256099942544/3419835294";

    private AppOpenAd appOpenAd = null;
    private boolean isLoadingAd = false;
    private boolean isShowingAd = false;
    private String unitId;

    /**
     * Keep track of the time an app open ad is loaded to ensure you don't show an expired ad.
     */
    private long loadTime = 0;

    public void init(Bridge bridge, CocosActivity activity) {
        super.init(bridge, activity);
        bridge.getRoute().on(LoadOpenAppAdREQ.class.getSimpleName(), LoadOpenAppAdREQ.class, arg -> {
            LoadOpenAppAdREQ req = (LoadOpenAppAdREQ) arg;
            loadAd(req.unitId);
            LoadOpenAppAdACK ack = new LoadOpenAppAdACK(req.unitId);
            bridge.sendToScript(LoadOpenAppAdACK.class.getSimpleName(), ack);
        });

        bridge.getRoute().on(ShowOpenAppAdREQ.class.getSimpleName(), ShowOpenAppAdREQ.class, arg -> {
            ShowOpenAppAdREQ ack = (ShowOpenAppAdREQ) arg;
            showAdIfAvailable();
            bridge.sendToScript(LoadOpenAppAdACK.class.getSimpleName(), ack);
        });

        bridge.getRoute().on(IsAdAvailableREQ.class.getSimpleName(), IsAdAvailableREQ.class, arg -> {
            IsAdAvailableREQ req = (IsAdAvailableREQ) arg;
            boolean valid = isAdAvailable();
            bridge.sendToScript(IsAdAvailableACK.class.getSimpleName(), new IsAdAvailableACK(req.unitId, valid));
        });
    }

    public void destroy() {

    }

    private void loadAd(String unitId) {
        this.unitId = unitId;
        // Do not load ad if there is an unused ad or one is already loading.
        if (isLoadingAd || isAdAvailable()) {
            return;
        }

        isLoadingAd = true;
        AdRequest request = new AdRequest.Builder()
                .setRequestAgent(AdManager.engineVersion)
                .build();
        AppOpenAd.load(
                activity,
                unitId,
                request,
                new AppOpenAd.AppOpenAdLoadCallback() {
                    /**
                     * Called when an app open ad has loaded.
                     *
                     * @param ad the loaded app open ad.
                     */
                    @Override
                    public void onAdLoaded(AppOpenAd ad) {
                        appOpenAd = ad;
                        isLoadingAd = false;
                        loadTime = (new Date()).getTime();

                        Log.d(TAG, "onAdLoaded.");
                        Toast.makeText(activity, "App open ad loaded", Toast.LENGTH_SHORT).show();
                        AppOpenAdLoadCallbackNTF ntf = new AppOpenAdLoadCallbackNTF(unitId);
                        ntf.method = "onAdLoaded";
                        bridge.sendToScript(AppOpenAdLoadCallbackNTF.class.getSimpleName(), ntf);
                    }

                    /**
                     * Called when an app open ad has failed to load.
                     *
                     * @param loadAdError the error.
                     */
                    @Override
                    public void onAdFailedToLoad(LoadAdError loadAdError) {
                        isLoadingAd = false;
                        Log.d(TAG, "onAdFailedToLoad: " + loadAdError.getMessage());
                        Toast.makeText(activity, "App open ad failed to load", Toast.LENGTH_SHORT).show();

                        AppOpenAdLoadCallbackNTF ntf = new AppOpenAdLoadCallbackNTF(unitId);
                        ntf.method = "onAdLoaded";
                        ntf.loadAdError = loadAdError.toString();
                        bridge.sendToScript(AppOpenAdLoadCallbackNTF.class.getSimpleName(), ntf);
                    }
                });
    }

    /**
     * Check if ad was loaded more than n hours ago.
     */
    private boolean wasLoadTimeLessThanNHoursAgo(long numHours) {
        long dateDifference = (new Date()).getTime() - loadTime;
        long numMilliSecondsPerHour = 3600000;
        return (dateDifference < (numMilliSecondsPerHour * numHours));
    }

    /**
     * Check if ad exists and can be shown.
     */
    private boolean isAdAvailable() {
        // Ad references in the app open beta will time out after four hours, but this time limit
        // may change in future beta versions. For details, see:
        // https://support.google.com/admob/answer/9341964?hl=en
        return appOpenAd != null && wasLoadTimeLessThanNHoursAgo(4);
    }

    private void showAdIfAvailable() {
        showAdIfAvailable(
                activity,
                new AdMobApplication.OnShowAdCompleteListener() {
                    @Override
                    public void onShowAdComplete() {
                        // Empty because the user will go back to the activity that shows the ad.
                        bridge.sendToScript(ShowOpenAppAdCompleteNTF.class.getSimpleName(), new ShowOpenAppAdCompleteNTF(unitId));
                    }
                });
    }

    private void showAdIfAvailable(
            @NonNull final Activity activity,
            @NonNull AdMobApplication.OnShowAdCompleteListener onShowAdCompleteListener) {
        // If the app open ad is already showing, do not show the ad again.
        if (isShowingAd) {
            Log.d(TAG, "The app open ad is already showing.");
            return;
        }

        // If the app open ad is not available yet, invoke the callback then load the ad.
        if (!isAdAvailable()) {
            Log.d(TAG, "The app open ad is not ready yet.");
            onShowAdCompleteListener.onShowAdComplete();
            return;
        }

        Log.d(TAG, "Will show ad.");

        appOpenAd.setFullScreenContentCallback(
                new FullScreenContentCallback() {
                    /** Called when full screen content is dismissed. */
                    @Override
                    public void onAdDismissedFullScreenContent() {
                        // Set the reference to null so isAdAvailable() returns false.
                        appOpenAd = null;
                        isShowingAd = false;

                        Log.d(TAG, "onAdDismissedFullScreenContent.");
                        Toast.makeText(activity, "onAdDismissedFullScreenContent", Toast.LENGTH_SHORT).show();

                        onShowAdCompleteListener.onShowAdComplete();
                        bridge.sendToScript(OpenAppAdFullScreenContentCallbackNTF.class.getSimpleName(), new OpenAppAdFullScreenContentCallbackNTF(unitId, "onAdDismissedFullScreenContent"));
                    }

                    /** Called when fullscreen content failed to show. */
                    @Override
                    public void onAdFailedToShowFullScreenContent(AdError adError) {
                        appOpenAd = null;
                        isShowingAd = false;

                        Log.d(TAG, "onAdFailedToShowFullScreenContent: " + adError.getMessage());
                        Toast.makeText(activity, "onAdFailedToShowFullScreenContent", Toast.LENGTH_SHORT)
                                .show();

                        onShowAdCompleteListener.onShowAdComplete();
                        bridge.sendToScript(OpenAppAdFullScreenContentCallbackNTF.class.getSimpleName(), new OpenAppAdFullScreenContentCallbackNTF(unitId, "onAdDismissedFullScreenContent", adError.toString()));
                    }

                    /** Called when fullscreen content is shown. */
                    @Override
                    public void onAdShowedFullScreenContent() {
                        Log.d(TAG, "onAdShowedFullScreenContent.");
                        Toast.makeText(activity, "onAdShowedFullScreenContent", Toast.LENGTH_SHORT).show();
                        bridge.sendToScript(OpenAppAdFullScreenContentCallbackNTF.class.getSimpleName(), new OpenAppAdFullScreenContentCallbackNTF(unitId, "onAdShowedFullScreenContent"));
                    }
                });

        isShowingAd = true;
        appOpenAd.show(activity);
    }
}