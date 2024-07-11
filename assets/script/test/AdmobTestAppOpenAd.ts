import { _decorator, Component } from 'cc';
import { log } from 'cc';
import { director } from 'cc';
import { TestScenes } from './TestScenes';
import { AppOpenAdClient } from 'db://admob/ads/client/AppOpenAdClient';
import { AdFormat, getTestAdUnitId } from 'db://admob/misc/TestUnitId';
const { ccclass, property } = _decorator;

const module = "[AdmobTestAppOpenAd]";
@ccclass('AdmobTestAppOpenAd')
export class AdmobTestAppOpenAd extends Component {

    appOpenAdView: AppOpenAdClient = new AppOpenAdClient();

    onClickLoadAppOpenAd() {
        log(module, "onClickLoadAppOpenAd");

        this.appOpenAdView.loadAd(getTestAdUnitId(AdFormat.AppOpen), {
            onAdLoaded: ()=> {
                log(module, "onClickLoadAppOpenAd", "onAdLoaded");
            },
            onAdFailedToLoad: (loadAdError) => {
                log(module, "onClickLoadAppOpenAd", "onAdFailedToLoad", loadAdError);
            },            
            onShowAdComplete(unitId) {
                log(module, "onClickLoadAppOpenAd", "onShowAdComplete");
            },
            onPaidEvent(paidNTF) {
                log(module, "onClickLoadAppOpenAd", "onPaidEvent");
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


