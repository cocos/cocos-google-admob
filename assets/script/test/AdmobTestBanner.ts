import { _decorator, Component } from 'cc';
import { Button } from 'cc';
import { log } from 'cc';
import { director } from 'cc';
import { TestScenes } from './TestScenes';
import { BannerClient } from '../admob/ads/client/BannerView';
import { LoadAdError } from '../admob/ads/alias/TypeAlias';
import { TestUnitId } from '../admob/misc/TestUnitId';
const { ccclass, property } = _decorator;

const module = "[AdmobTestBanner]"
@ccclass('AdmobTestBanner')
export class AdmobTestBanner extends Component {

    @property(Button)
    buttonShowBanner: Button;

    @property(Button)
    buttonHideBanner: Button;

    bannerClient: BannerClient;

    start() {
        this.bannerClient?.destroy();
    }

    onDestroy() {
        this.bannerClient?.destroy();
    }

    onClickLoadBanner() {
        if (this.bannerClient != null) {
            throw new Error("duplicated create of bannerView");
        }
        this.bannerClient = new BannerClient();
        this.bannerClient.create(TestUnitId.BannerAd, {

            onAdImpression: () => {
                log(module, "onAdImpression", "onAdClicked", this);
                this.buttonShowBanner.interactable = true;
                this.buttonHideBanner.interactable = true;
            },

            onAdClicked: () => {
                log(module, "onClickLoadBanner", "onAdClicked")
            },

            onAdLoaded: () => {
                log(module, "onClickLoadBanner", "onAdLoaded")
            },

            onAdFailedToLoad: (loadError: LoadAdError) => {
                log(module, "onClickLoadBanner", "onAdLoaded")
                throw new Error(`load Ad Error, the error is: ${loadError}.`);
            }
        });
    }

    onClickShowBanner() {
        this.bannerClient?.show(true);
    }

    onClickHideBanner() {
        this.bannerClient?.show(false);
    }

    onClickDestroyBanner() {
        log(module, "onClickDestroyBanner");
        this.bannerClient?.destroy();
    }

    onNextScene() {
        director.loadScene(TestScenes[1]);
    }
}