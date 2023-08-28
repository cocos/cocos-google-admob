package com.cocos.admob.service;

import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.cocos.admob.AdServiceHub;
import com.cocos.admob.core.Bridge;
import com.cocos.admob.core.IScriptHandler;
import com.cocos.admob.proto.interstitial.InterstitialAdLoadCalLBackNTF;
import com.cocos.admob.proto.interstitial.InterstitialFullScreenContentCallbackNTF;
import com.cocos.admob.proto.interstitial.InterstitialPaidEventNTF;
import com.cocos.admob.proto.interstitial.LoadInterstitialAdACK;
import com.cocos.admob.proto.interstitial.LoadInterstitialAdREQ;
import com.cocos.admob.proto.interstitial.ShowInterstitialAdACK;
import com.cocos.admob.proto.interstitial.ShowInterstitialAdREQ;
import com.cocos.lib.CocosActivity;
import com.google.android.gms.ads.AdError;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdapterResponseInfo;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;

/**
 * Internal class for interstitial ads.
 */
public final class InterstitialAdService extends Service{

    private static final String TAG = "InterstitialAdService";

    private InterstitialAd interstitialAd = null;
    private String unitId;

    public void init(Bridge bridge, CocosActivity activity) {
        super.init(bridge, activity);
        bridge.getRoute().on(LoadInterstitialAdREQ.class.getSimpleName(), LoadInterstitialAdREQ.class, new IScriptHandler() {
            @Override
            public void onMessage(Object arg) {
                LoadInterstitialAdREQ req = (LoadInterstitialAdREQ) arg;
                loadAd(req.unitId);
                bridge.sendToScript(LoadInterstitialAdACK.class.getSimpleName(), new LoadInterstitialAdACK(unitId));
            }
        });

        bridge.getRoute().on(ShowInterstitialAdREQ.class.getSimpleName(), ShowInterstitialAdREQ.class, new IScriptHandler() {
            @Override
            public void onMessage(Object arg) {
                ShowInterstitialAdREQ req = (ShowInterstitialAdREQ) arg;
                showAd();
                bridge.sendToScript(ShowInterstitialAdACK.class.getSimpleName(), new ShowInterstitialAdACK(unitId));
            }
        });
    }

    private void loadAd(String unitId) {
        this.unitId = unitId;
        AdRequest adRequest = new AdRequest.Builder()
                .setRequestAgent(AdServiceHub.extensionVersion)
                .build();
        InterstitialAd.load(activity, unitId, adRequest,
                new InterstitialAdLoadCallback() {
                    @Override
                    public void onAdLoaded(@NonNull InterstitialAd ad) {
                        // The mInterstitialAd reference will be null until
                        // an ad is loaded.
                        interstitialAd = ad;
                        Toast.makeText(activity, "Interstitial ad loaded", Toast.LENGTH_SHORT).show();
                        bridge.sendToScript(InterstitialAdLoadCalLBackNTF.class.getSimpleName(), new InterstitialAdLoadCalLBackNTF(unitId, "onAdLoaded"));

                        interstitialAd.setOnPaidEventListener(adValue -> {
                            InterstitialPaidEventNTF interstitialPaidEventNTF = new InterstitialPaidEventNTF(unitId);

                            interstitialPaidEventNTF.valueMicros = adValue.getValueMicros();
                            interstitialPaidEventNTF.currencyCode = adValue.getCurrencyCode();
                            interstitialPaidEventNTF.precision = adValue.getPrecisionType();

                            if(interstitialAd != null){
                                AdapterResponseInfo loadedAdapterResponseInfo = interstitialAd.getResponseInfo().
                                        getLoadedAdapterResponseInfo();
                                interstitialPaidEventNTF.adSourceName = loadedAdapterResponseInfo.getAdSourceName();
                                interstitialPaidEventNTF.adSourceId = loadedAdapterResponseInfo.getAdSourceId();
                                interstitialPaidEventNTF.adSourceInstanceName = loadedAdapterResponseInfo.getAdSourceInstanceName();
                                interstitialPaidEventNTF.adSourceInstanceId = loadedAdapterResponseInfo.getAdSourceInstanceId();

                                Bundle extras = InterstitialAdService.this.interstitialAd.getResponseInfo().getResponseExtras();
                                interstitialPaidEventNTF.mediationGroupName = extras.getString("mediation_group_name");
                                interstitialPaidEventNTF.mediationABTestName = extras.getString("mediation_ab_test_name");
                                interstitialPaidEventNTF.mediationABTestVariant = extras.getString("mediation_ab_test_variant");
                            }

                            bridge.sendToScript(InterstitialPaidEventNTF.class.getSimpleName(), interstitialPaidEventNTF);
                        });

                        interstitialAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                            @Override
                            public void onAdClicked() {
                                // Called when a click is recorded for an ad.
                                Log.d(TAG, "Ad was clicked.");
                                bridge.sendToScript(InterstitialFullScreenContentCallbackNTF.class.getSimpleName(), new InterstitialFullScreenContentCallbackNTF(unitId, "onAdClicked"));
                            }

                            @Override
                            public void onAdDismissedFullScreenContent() {
                                // Called when ad is dismissed.
                                // Set the ad reference to null so you don't show the ad a second time.
                                Log.d(TAG, "Ad dismissed fullscreen content.");
                                interstitialAd = null;
                                bridge.sendToScript(InterstitialFullScreenContentCallbackNTF.class.getSimpleName(), new InterstitialAdLoadCalLBackNTF(unitId, "onAdDismissedFullScreenContent"));
                            }

                            @Override
                            public void onAdFailedToShowFullScreenContent(AdError adError) {
                                // Called when ad fails to show.
                                Log.e(TAG, "Ad failed to show fullscreen content.");
                                interstitialAd = null;
                                bridge.sendToScript(InterstitialFullScreenContentCallbackNTF.class.getSimpleName(), new InterstitialFullScreenContentCallbackNTF(unitId, "onAdFailedToShowFullScreenContent", adError.toString()));
                            }

                            @Override
                            public void onAdImpression() {
                                // Called when an impression is recorded for an ad.
                                Log.d(TAG, "Ad recorded an impression.");
                                bridge.sendToScript(InterstitialFullScreenContentCallbackNTF.class.getSimpleName(), new InterstitialFullScreenContentCallbackNTF(unitId, "onAdImpression"));
                            }

                            @Override
                            public void onAdShowedFullScreenContent() {
                                // Called when ad is shown.
                                Log.d(TAG, "Ad showed fullscreen content.");
                                bridge.sendToScript(InterstitialFullScreenContentCallbackNTF.class.getSimpleName(), new InterstitialFullScreenContentCallbackNTF(unitId, "onAdShowedFullScreenContent"));
                            }
                        });
                    }

                    @Override
                    public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                        // Handle the error
                        Log.d(TAG, loadAdError.toString());
                        Toast.makeText(activity, "Interstitial ad failed to load.", Toast.LENGTH_SHORT).show();
                        interstitialAd = null;
                        bridge.sendToScript(InterstitialAdLoadCalLBackNTF.class.getSimpleName(), new InterstitialAdLoadCalLBackNTF(unitId, "onAdFailedToLoad", loadAdError.toString()));
                    }
                });
    }

    private void showAd() {
        if (interstitialAd == null) {
            Log.e(TAG, "showAd: interstitial ad is not loaded ");
            return;
        }

        interstitialAd.show(activity);
    }
}