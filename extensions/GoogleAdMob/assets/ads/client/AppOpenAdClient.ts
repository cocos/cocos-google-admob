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
import { bridge } from "../../core/Bridge";
import { route } from "../../core/Route";
import { AppOpenAdLoadCallbackNTF, AppOpenAdFullScreenContentCallbackNTF, ShowAppOpenAdCompleteNTF, LoadAppOpenAdREQ, LoadAppOpenAdACK, IsAdAvailableREQ, IsAdAvailableACK, ShowAppOpenAdREQ as ShowAppOpenAdREQ, ShowAppOpenAdACK } from "../../proto/AppOpenAd";
import { OnShowAdCompleteListener } from "../listener/OnShowAdCompleteListener";
import { AdClient } from "./AdClient";
import { AppOpenAdListener } from "../listener/AppOpenAdListener";
import { AppOpenPaidEventNTF } from "../../proto/PaidEventNTF";
import { OnPaidEventListener } from "../listener/OnPaidEventListener";
import { js } from "cc";

/**
 * @zh
 * 开屏广告的 TS 端实现
 * @en
 * Implementing of app open ad.
 */
const module = "[AppOpenAdClient]";
export class AppOpenAdClient extends AdClient {

    /**
     * @zh
     * 开屏广告的事件接收器，多个类型的联合
     * @en
     * The listener of app open ad.
     */
    private _appOpenAdListener: AppOpenAdListener

    /**
     * @zh
     * 开屏广告的事件接收器，多个类型的联合
     * @en
     * The listener of app open ad.
     */
    set appOpenAdListener(value: AppOpenAdListener) {
        if (this._appOpenAdListener) {
            route.off(js.getClassName(AppOpenAdLoadCallbackNTF), this.onAppOpenAdLoadCallbackNTF, this);
            route.off(js.getClassName(AppOpenPaidEventNTF), this.onPaidEvent, this);
            route.off(js.getClassName(AppOpenAdFullScreenContentCallbackNTF), this.onFullScreenContentCallbackNTF, this);
            route.off(js.getClassName(ShowAppOpenAdCompleteNTF), this.onShowCompleteNTF, this);
        }

        this._appOpenAdListener = value;
        if (value) {
            route.on(js.getClassName(AppOpenAdLoadCallbackNTF), this.onAppOpenAdLoadCallbackNTF, this);
            route.on(js.getClassName(AppOpenPaidEventNTF), this.onPaidEvent, this);
            route.on(js.getClassName(AppOpenAdFullScreenContentCallbackNTF), this.onFullScreenContentCallbackNTF, this);
            route.on(js.getClassName(ShowAppOpenAdCompleteNTF), this.onShowCompleteNTF, this);
        }
    }

    /**
     * @zh
     * 开屏广告的事件接收器，多个类型的联合
     * @en
     * The listener of app open ad.
     */
    get appOpenAdListener(): AppOpenAdListener {
        return this._appOpenAdListener;
    }

    /**
     * @zh
     * 加载开屏广告
     * @en
     * load app open ad.
     * @param unitId 
     *  @zh 开屏广告的单元 Id
     *  @en the unit id of app open ad
     * @param appOpenAdListener 
     *  @zh 开屏广告监听器
     *  @en listener for app open ad
     */
    loadAd(unitId: string, appOpenAdListener?: AppOpenAdListener) {
        this.appOpenAdListener = appOpenAdListener;
        this.unitId = unitId;

        bridge.sendToNative(js.getClassName(LoadAppOpenAdREQ), { unitId: unitId }, js.getClassName(LoadAppOpenAdACK), (ack: LoadAppOpenAdACK) => {

        }, this);
    }

    /**
     * @zh
     * 开屏广告是否有效
     * 要从回调中去判断是否有效，在安卓上，消息是来自其他线程的，因此是异步的。
     * @en
     * whether the app open ad is valid.
     * @param onComplete 
     * @param thisArg 
     */
    isValid(onComplete: (valid: boolean) => void, thisArg: any) {
        bridge.sendToNative(js.getClassName(IsAdAvailableREQ), { unitId: this.unitId }, js.getClassName(IsAdAvailableACK), (ack: IsAdAvailableACK) => {
            log(module, "isValid", ack.valid);
            if (onComplete && thisArg) {
                onComplete.call(thisArg, ack.valid)
            }
        })
    }

    /**
     * @zh
     *  显示开屏广告
     * @en
     *  Show app open ad.
     * @param onComplete 
     *  @zh 展示结束
     *  @en whether the show process is complete
     */
    show(onComplete?: () => void) {
        bridge.sendToNative(js.getClassName(ShowAppOpenAdREQ), { unitId: this.unitId }, js.getClassName(ShowAppOpenAdACK), (ack: ShowAppOpenAdACK) => {
            log(module, "showAdIfAvailable", ack);
            if (onComplete) {
                onComplete();
            }
        })
    }

    /**
     * @zh
     * 销毁开屏广告
     * 安卓中没有手动销毁的方法，这里的销毁是事件回调
     * @en
     * Destroy the app open ad
     * Note that there is no 'destroy' method on the app open ad.
     * Simply deregister all callbacks.
     */
    destroy() {
        this.appOpenAdListener = null;
    }

    private onAppOpenAdLoadCallbackNTF(ntf: AppOpenAdLoadCallbackNTF) {
        if (this.appOpenAdListener) {
            let method = this.appOpenAdListener[ntf.method];
            if (method) {
                method(ntf.loadAdError);
            }
        }
    }

    private onFullScreenContentCallbackNTF(ntf: AppOpenAdFullScreenContentCallbackNTF) {
        if (ntf && ntf.method && this.appOpenAdListener) {
            let method = this.appOpenAdListener[ntf.method];
            if (method) {
                method(ntf.adError);
            }
        }
    }

    private onShowCompleteNTF(ntf: ShowAppOpenAdCompleteNTF) {
        const c = this.appOpenAdListener as OnShowAdCompleteListener;
        if (c && c.onShowAdComplete) {
            c.onShowAdComplete(ntf.unitId);
        }
    }

    private onPaidEvent(ntf: AppOpenPaidEventNTF) {
        const listener = this.appOpenAdListener as OnPaidEventListener<AppOpenPaidEventNTF>;
        if (listener && listener.onPaidEvent) {
            listener.onPaidEvent(ntf);
        }
    }
}