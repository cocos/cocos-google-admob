import { _decorator, Component } from 'cc';
import { director } from 'cc';
import { TestScenes } from './TestScenes';
import { log } from 'cc';
import { NativeAdClient } from 'db://admob/ads/client/NativeAdClient';
import { AdFormat, getTestAdUnitId } from 'db://admob/misc/TestUnitId';
import { NativeAdTemplateSize } from 'db://admob/proto/NativeAd';
import { NativePaidEventNTF } from 'db://admob/proto/PaidEventNTF';
const { ccclass, property } = _decorator;

const module = "[AdmobTestNative]"
@ccclass('AdmobTestNative')
export class AdmobTestNative extends Component {

    smallNativeAd: NativeAdClient;
    mediumNativeAd: NativeAdClient;

    onClickLoadSmallAd() {
        log(module, "onClickLoadNativeAd");

        this.smallNativeAd = new NativeAdClient();
        this.smallNativeAd.load(getTestAdUnitId(AdFormat.Native), NativeAdTemplateSize.Small, {
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
        this.mediumNativeAd.load(getTestAdUnitId(AdFormat.Native), NativeAdTemplateSize.Medium, {
            onAdLoaded: () => {
                log(module, "onClickLoadSmallAd", "onAdLoaded");
            },

            onPaidEvent(paidNTF:NativePaidEventNTF) {
                // paid event, you can do your own analysis here.
                log(module, "onPaidEvent", paidNTF);                
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