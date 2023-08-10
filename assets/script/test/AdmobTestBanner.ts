import { _decorator, Component } from 'cc';
import { Button } from 'cc';
import { log } from 'cc';
import { director } from 'cc';
import { TestScenes } from './TestScenes';
import { BannerClient } from 'db://admob/ads/client/BannerClient';
import { LoadAdError } from 'db://admob/ads/alias/TypeAlias';
import { TestUnitId } from 'db://admob/misc/TestUnitId';
import { BannerSize } from 'db://admob/misc/BannerSize';
import { BannerAlignment, BottomCenter, TopCenter } from 'db://admob/misc/BannerAlignment';
import { BannerPaidEventNTF } from 'db://admob/proto/PaidEventNTF';
import { BannerSizeType } from 'db://admob/misc/BannerSizeType';
import { Toggle } from 'cc';
const { ccclass, property } = _decorator;

const module = "[AdmobTestBanner]"
@ccclass('AdmobTestBanner')
export class AdmobTestBanner extends Component {

    @property(Button)
    buttonShowBanner: Button;

    @property(Button)
    buttonHideBanner: Button;

    bannerClient: BannerClient;

    currentAlignment : BannerAlignment[] = TopCenter;

    start() {
        this.bannerClient?.destroy();
    }

    onDestroy() {
        this.bannerClient?.destroy();
    }

    onAlignmentToggleChanged(toggle:Toggle){
        this.currentAlignment = toggle.isChecked ? TopCenter : BottomCenter;
    }

    onClickLoadBanner() {
        if (this.bannerClient != null) {
            log("duplicated create of banner client, destroy the former banner client");
            this.bannerClient.destroy();
        }
        this.bannerClient = new BannerClient();
        this.bannerClient.load(TestUnitId.BannerAd, {
            onAdImpression: () => {
                log(module, "onAdImpression", "onAdClicked", this);
            },

            onAdClicked: () => {
                log(module, "onClickLoadBanner", "onAdClicked")
            },

            onAdLoaded: () => {
                log(module, "onClickLoadBanner", "onAdLoaded")
            },

            onAdFailedToLoad: (loadError: LoadAdError) => {
                log(module, "onClickLoadBanner", "onAdLoaded", `${loadError}`);
            },

            onPaidEvent(paidNTF: BannerPaidEventNTF) {
                // paid event, you can do your own analysis here.
                log(module, "onPaidEvent", paidNTF);
            },

        }, { size: BannerSize.BANNER, alignments: this.currentAlignment, type: BannerSizeType.Builtin });
    }

    onClickDestroyBanner() {
        log(module, "onClickDestroyBanner");
        this.bannerClient?.destroy();
    }

    onNextScene() {
        director.loadScene(TestScenes[1]);
    }

    onClickLoadLandscape() {
        if (this.bannerClient != null) {
            log("duplicated create of banner client, destroy the former banner client");
            this.bannerClient.destroy();
        }
        this.bannerClient = new BannerClient();
        this.bannerClient.load(TestUnitId.BannerAd, {
            onAdImpression: () => {
                log(module, "onAdImpression", "onAdClicked", this);
            },

            onAdClicked: () => {
                log(module, "onClickLoadBanner", "onAdClicked")
            },

            onAdLoaded: () => {
                log(module, "onClickLoadBanner", "onAdLoaded")
            },

            onAdFailedToLoad: (loadError: LoadAdError) => {
                log(module, "onClickLoadBanner", "onAdLoaded", `${loadError}`);
            },

            onPaidEvent(paidNTF: BannerPaidEventNTF) {
                // paid event, you can do your own analysis here.
                log(module, "onPaidEvent", paidNTF);
            },

        }, { alignments: this.currentAlignment, type: BannerSizeType.Landscape });
    }

    onClickLoadPortrait() {
        if (this.bannerClient != null) {
            log("duplicated create of banner client, destroy the former banner client");
            this.bannerClient.destroy();
        }
        this.bannerClient = new BannerClient();
        this.bannerClient.load(TestUnitId.BannerAd, {
            onAdImpression: () => {
                log(module, "onAdImpression", "onAdClicked", this);
            },

            onAdClicked: () => {
                log(module, "onClickLoadBanner", "onAdClicked")
            },

            onAdLoaded: () => {
                log(module, "onClickLoadBanner", "onAdLoaded")
            },

            onAdFailedToLoad: (loadError: LoadAdError) => {
                log(module, "onClickLoadBanner", "onAdLoaded", `${loadError}`);
            },

            onPaidEvent(paidNTF: BannerPaidEventNTF) {
                // paid event, you can do your own analysis here.
                log(module, "onPaidEvent", paidNTF);
            },

        }, { alignments: this.currentAlignment, type: BannerSizeType.Portrait });
    }

    
    onClickLoadCurrent() {
        if (this.bannerClient != null) {
            log("duplicated create of banner client, destroy the former banner client");
            this.bannerClient.destroy();
        }
        this.bannerClient = new BannerClient();
        this.bannerClient.load(TestUnitId.BannerAd, {
            onAdImpression: () => {
                log(module, "onAdImpression", "onAdClicked", this);
            },

            onAdClicked: () => {
                log(module, "onClickLoadBanner", "onAdClicked")
            },

            onAdLoaded: () => {
                log(module, "onClickLoadBanner", "onAdLoaded")
            },

            onAdFailedToLoad: (loadError: LoadAdError) => {
                log(module, "onClickLoadBanner", "onAdLoaded", `${loadError}`);
            },

            onPaidEvent(paidNTF: BannerPaidEventNTF) {
                // paid event, you can do your own analysis here.
                log(module, "onPaidEvent", paidNTF);
            },

        }, { alignments: this.currentAlignment, type: BannerSizeType.Current });
    }
}