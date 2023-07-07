import { _decorator, Component } from 'cc';
import { log } from 'cc';
import { director } from 'cc';
import { TestScenes } from './TestScenes';
import { InterstitialAdClient } from 'db://admob/ads/client/InterstitialAdClient';
import { TestUnitId } from 'db://admob/misc/TestUnitId';
import { InterstitialPaidEventNTF } from 'db://admob/proto/PaidEventNTF';
const { ccclass, property } = _decorator;

const module = "[AdmobTestInterstitialAdts]";
@ccclass('AdmobTestInterstitialAdts')
export class AdmobTestInterstitialAdts extends Component {

    onClickLoadInterstitialAd() {

        let interstitialAdClient = new InterstitialAdClient();

        interstitialAdClient.load(TestUnitId.InterstitialAd, {
            onAdLoaded: () => {
                log(module, "onAdLoaded");
                interstitialAdClient.show();
            },
            onAdFailedToLoad: (loadAdError) => {
                log(module, "onAdFailedToLoad, error: ", loadAdError);
                interstitialAdClient.destroy();
            },

            onPaidEvent(paidNTF:InterstitialPaidEventNTF) {
                // paid event, you can do your own analysis here.
                log(module, "onPaidEvent", paidNTF);                
            },
        });
    }

    onNextScene() {
        director.loadScene(TestScenes[2]);
    }
}


