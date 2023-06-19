import { _decorator, Component } from 'cc';
import { log } from 'cc';
import { director } from 'cc';
import { TestScenes } from './TestScenes';
import { InterstitialAdClient } from '../admob/ads/client/InterstitialAdClient';
import { TestUnitId } from '../admob/misc/TestUnitId';
const { ccclass, property } = _decorator;

const module = "[AdmobTestInterstitialAdts]";
@ccclass('AdmobTestInterstitialAdts')
export class AdmobTestInterstitialAdts extends Component {
   
    onClickLoadInterstitialAd() {

        let interstitialAdClient = new InterstitialAdClient();

        interstitialAdClient.load( TestUnitId.InterstitialAd, {
            onAdLoaded() {
                log(module, "onAdLoaded");
                interstitialAdClient.show();
            },
            onAdFailedToLoad(loadAdError) {
                log(module, "onAdFailedToLoad, error: ", loadAdError);
                interstitialAdClient.destroy();
            },
        });         
    }

    onNextScene() {
        director.loadScene(TestScenes[2]);
    }
}


