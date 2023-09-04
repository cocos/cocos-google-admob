/*
 Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 of the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/
import { log } from "cc";
import { AdClient } from "./AdClient";
import { LoadRewardedInterstitialAdACK, LoadRewardedInterstitialAdREQ, OnUserEarnedRewardedInterstitialListenerNTF, RewardedInterstitialAdLoadCallbackNTF, ShowRewardedInterstitialAdACK, ShowRewardedInterstitialAdREQ } from "../../proto/RewardedInterstitialAd";
import { bridge } from "../../core/Bridge";
import { route } from "../../core/Route";
import { RewardedInterstitialListener } from "../listener/RewardedInterstitialListener";
import { OnUserEarnedRewardListener } from "../listener/OnUserEarnedRewardListener";
import { RewardedInterstitialPaidEventNTF } from "../../proto/PaidEventNTF";
import { OnPaidEventListener } from "../listener/OnPaidEventListener";
import { js } from "cc";

/**
 * @zh
 * 插页式激励广告的广告客户端
 * https://developers.google.com/admob/android/rewarded-interstitial?hl=zh-cn
 * 
 * @en
 * The RewardedInterstitial Ad Client
 */
const module = "[RewardedInterstitialAdClient]";
export class RewardedInterstitialAdClient extends AdClient {

    /**
     * @zh
     * 监听器的联合
     * @en
     * The union of all listeners
     */
    private _rewardedInterstitialListener: RewardedInterstitialListener

    /**
     * @zh
     * 监听器的联合
     * @en
     * The union of all listeners
     */
    set rewardedInterstitialListener(value: RewardedInterstitialListener) {
        if (this._rewardedInterstitialListener) {
            route.off(js.getClassName(RewardedInterstitialAdLoadCallbackNTF), this.onRewardedInterstitialAdLoadCallbackNTF, this);
            route.off(js.getClassName(OnUserEarnedRewardedInterstitialListenerNTF), this.onOnUserEarnedRewardListenerNTF, this);
            route.off(js.getClassName(RewardedInterstitialPaidEventNTF), this.onPaidEvent, this);
        }

        this._rewardedInterstitialListener = value;
        if (this._rewardedInterstitialListener) {
            route.on(js.getClassName(RewardedInterstitialAdLoadCallbackNTF), this.onRewardedInterstitialAdLoadCallbackNTF, this);
            route.on(js.getClassName(OnUserEarnedRewardedInterstitialListenerNTF), this.onOnUserEarnedRewardListenerNTF, this);
            route.on(js.getClassName(RewardedInterstitialPaidEventNTF), this.onPaidEvent, this);
        }
    }

    /**
     * @zh
     * 监听器的联合
     * @en
     * The union of all listeners
     */
    get rewardedInterstitialListener(): RewardedInterstitialListener {
        return this._rewardedInterstitialListener;
    }

    /**
     * @zh
     * 加载 
     * @param unitId 
     * @param listener 
     */
    load(unitId: string, listener: RewardedInterstitialListener) {
        this.destroy();
        this.unitId = unitId;
        this.rewardedInterstitialListener = listener;
        bridge.sendToNative(js.getClassName(LoadRewardedInterstitialAdREQ), { unitId: unitId },
            js.getClassName(LoadRewardedInterstitialAdACK),
            (ack: LoadRewardedInterstitialAdACK) => {

            }, this);
    }

    /**
     * @zh
     * 销毁插页式激励广告注册的事件
     * @en
     * Deregister all registered event listeners
     */
    destroy() {
        this.rewardedInterstitialListener = null;
    }

    /**
     * @zh
     * 展示已加载插页式激励广告
     * @en
     * Show the loaded RewardedInterstitial Ad.
     */
    show() {
        bridge.sendToNative(js.getClassName(ShowRewardedInterstitialAdREQ), { unitId: this.unitId }, js.getClassName(ShowRewardedInterstitialAdACK),
            (ack: ShowRewardedInterstitialAdACK) => {

            }, this);
    }

    private onRewardedInterstitialAdLoadCallbackNTF(ntf: RewardedInterstitialAdLoadCallbackNTF) {
        log(module, "onRewardedInterstitialAdLoadCallbackNTF", ntf.method);
        const method = this.rewardedInterstitialListener[ntf.method];
        if (method) {
            method(ntf.loadAdError);
        }
    }

    private onOnUserEarnedRewardListenerNTF(ntf: OnUserEarnedRewardedInterstitialListenerNTF) {
        log(module, `onOnUserEarnedRewardListenerNTF`);
        if (this.rewardedInterstitialListener) {
            const onEarn = this.rewardedInterstitialListener as OnUserEarnedRewardListener;
            if (onEarn && onEarn.onEarn) {
                onEarn.onEarn(ntf.rewardType, ntf.rewardAmount);
            }
        }
    }

    private onPaidEvent(ntf: RewardedInterstitialPaidEventNTF) {
        const paid = this.rewardedInterstitialListener as OnPaidEventListener<RewardedInterstitialPaidEventNTF>;
        if (paid && paid.onPaidEvent) {
            paid.onPaidEvent(ntf);
        }
    }
}