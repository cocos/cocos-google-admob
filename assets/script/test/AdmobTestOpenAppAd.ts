import { _decorator, Component } from 'cc';
import { log } from 'cc';
import { director } from 'cc';
import { TestScenes } from './TestScenes';
import { AppOpenAdClient } from 'db://admob/ads/client/AppOpenAdClient';
import { TestUnitId } from 'db://admob/misc/TestUnitId';
const { ccclass, property } = _decorator;

const module = "[AdmobTestOpenAppAd]";
@ccclass('AdmobTestOpenAppAd')
export class AdmobTestOpenAppAd extends Component {

    appOpenAdView: AppOpenAdClient = new AppOpenAdClient();

    onClickLoadOpenAppAd() {
        log(module, "onClickLoadOpenAppAd");

        this.appOpenAdView.loadAd(TestUnitId.OpenAppAd, {
            onAdLoaded() {
                log(module, "onClickLoadOpenAppAd", "onAdLoaded");
            },
            onAdFailedToLoad(loadAdError) {
                log(module, "onClickLoadOpenAppAd", "onAdFailedToLoad", loadAdError);
            },
        });

    }

    onClickShowOpenAppAd() {
        log(module, "onClickShowOpenAppAd");

        this.appOpenAdView.isValid((valid: boolean) => {
            log(module, "onClickShowOpenAppAd", valid);
            if (valid) {
                this.appOpenAdView.show();
            }
        }, this);
    }

    onNextScene() {
        director.loadScene(TestScenes[3]);
    }
}


