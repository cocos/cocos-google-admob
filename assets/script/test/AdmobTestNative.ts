import { _decorator, Component } from 'cc';
import { director } from 'cc';
import { TestScenes } from './TestScenes';
import { log } from 'cc';
import { NativeAdClient } from 'db://admob/ads/client/NativeAdClient';
import { TestUnitId } from 'db://admob/misc/TestUnitId';
import { NativeAdTemplateSize } from 'db://admob/proto/NativeAd';
const { ccclass, property } = _decorator;

const module = "[AdmobTestNative]"
@ccclass('AdmobTestNative')
export class AdmobTestNative extends Component {

    smallNativeAd: NativeAdClient;
    mediumNativeAd: NativeAdClient;

    onClickLoadSmallAd() {
        log(module, "onClickLoadNativeAd");

        this.smallNativeAd = new NativeAdClient();
        this.smallNativeAd.load(TestUnitId.NativeAd, NativeAdTemplateSize.Small, {
            onAdLoaded: () => {
                log(module, "onClickLoadSmallAd", "onAdLoaded");
            },
        });
    }

    onClickCloseSmallAd() {
        if (this.smallNativeAd) {
            this.smallNativeAd.destroy();
        }
    }

    onClickLoadMediumAd() {
        log(module, "onClickLoadNativeAd");

        this.mediumNativeAd = new NativeAdClient();
        this.mediumNativeAd.load(TestUnitId.NativeAd, NativeAdTemplateSize.Medium, {
            onAdLoaded: () => {
                log(module, "onClickLoadSmallAd", "onAdLoaded");
            },
        });
    }

    onClickCloseMediumAd() {
        if (this.mediumNativeAd) {
            this.mediumNativeAd.destroy();
        }
    }

    onNextScene() {
        director.loadScene(TestScenes[0]);
    }
}