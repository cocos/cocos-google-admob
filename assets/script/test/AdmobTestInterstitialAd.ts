import { _decorator, Component } from 'cc';
import { log } from 'cc';
import { director } from 'cc';
import { TestScenes } from './TestScenes';
import { InterstitialAdView } from '../admob/ads/InterstitialAdView';
import { TestUnitId } from '../admob/misc/TestUnitId';
const { ccclass, property } = _decorator;

const module = "[AdmobTestInterstitialAdts]";
@ccclass('AdmobTestInterstitialAdts')
export class AdmobTestInterstitialAdts extends Component {
   
    onClickLoadInterstitialAd() {

        let interstitialAdView = new InterstitialAdView();

        interstitialAdView.load( TestUnitId.InterstitialAd, {
            onAdLoaded() {
                log(module, "onAdLoaded");
                interstitialAdView.show();
            },
            onAdFailedToLoad(loadAdError) {
                log(module, "onAdFailedToLoad, error: ", loadAdError);
                interstitialAdView.destroy();
            },
        });         
    }

    onNextScene() {
        director.loadScene(TestScenes[2]);
    }
}


