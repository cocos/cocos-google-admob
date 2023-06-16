import { _decorator, Component } from 'cc';
import { Button } from 'cc';
import { log } from 'cc';
import { director } from 'cc';
import { TestScenes } from './TestScenes';
import { BannerView } from '../admob/ads/BannerView';
import { LoadAdError } from '../admob/ads/TypeAlias';
import { TestUnitId } from '../admob/misc/TestUnitId';
const { ccclass, property } = _decorator;

const module = "[AdmobTestBanner]"
@ccclass('AdmobTestBanner')
export class AdmobTestBanner extends Component {

    @property(Button)
    buttonShowBanner: Button;

    @property(Button)
    buttonHideBanner: Button;

    bannerView: BannerView;

    start() {;
        this.bannerView?.destroy();
    }

    onDestroy(){
        this.bannerView?.destroy();
    }

    onClickLoadBanner() {
        if( this.bannerView != null ){
            throw new Error("duplicated create of bannerView");
        }
        this.bannerView = new BannerView();
        this.bannerView.create( TestUnitId.BannerAd, {

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
        this.bannerView?.show(true);
    }

    onClickHideBanner() {
        this.bannerView?.show(false);
    }

    onClickDestroyBanner() {
        log(module, "onClickDestroyBanner");
        this.bannerView?.destroy();
    }

    onNextScene() {
        director.loadScene(TestScenes[1]);
    }
}