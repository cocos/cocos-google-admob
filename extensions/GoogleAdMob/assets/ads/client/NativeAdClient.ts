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
import { DestroyBannerACK } from "../../proto/BannerAd";
import { DestroyNativeAdACK, DestroyNativeAdREQ, LoadNativeAdACK, LoadNativeAdREQ, NativeAdListenerNTF, NativeAdTemplateSize, NativeLoadedNTF } from "../../proto/NativeAd";
import { AdClient } from "./AdClient";
import { NativeAdListener } from "../listener/NativeAdListener";
import { route } from "../../core/Route";
import { OnNativeAdLoadedListener } from "../listener/OnNativeAdLoadedListener";
import { NativePaidEventNTF } from "../../proto/PaidEventNTF";
import { OnPaidEventListener } from "../listener/OnPaidEventListener";
import { js } from "cc";

/**
 * @zh
 * 原生广告客户端
 * 由于不可销毁，通常来说游戏不会用到
 * 提供两种类型，请查看 NativeAdTemplateSize
 * @en
 * native ad client
 * Two types are supported, please check NativeAdTemplateSize for more details
 */
const module = "[NativeAdClient]";
export class NativeAdClient extends AdClient {

    /**
     * @zh
     * 原生广告的监听器
     * @en
     * Listener for the native ad
     */
    private _nativeAdListener: NativeAdListener;

    /**
     * @zh
     * 原生广告的监听器
     * @en
     * Listener for the native ad
     */
    get nativeAdListener(): NativeAdListener {
        return this._nativeAdListener;
    }

    /**
     * @zh
     * 原生广告的监听器
     * @en
     * Listener for the native ad
     */
    set nativeAdListener(value: NativeAdListener) {
        if (this._nativeAdListener) {
            route.off(js.getClassName(NativeLoadedNTF), this.onNativeLoadedNTF, this);
            route.off(js.getClassName(NativeAdListenerNTF), this.onNativeAdListenerNTF, this);
            route.off(js.getClassName(NativePaidEventNTF), this.onPaidEvent, this);

        }
        this._nativeAdListener = value;
        if (this._nativeAdListener) {
            route.on(js.getClassName(NativeLoadedNTF), this.onNativeLoadedNTF, this);
            route.on(js.getClassName(NativeAdListenerNTF), this.onNativeAdListenerNTF, this);
            route.on(js.getClassName(NativePaidEventNTF), this.onPaidEvent, this);
        }
    }

    /**
     * @zh
     * 加载原生广告
     * @en
     * Load native ad.
     * @param unitId 
     *  @zh 单元Id
     *  @en The unit id
     * @param size 
     *  @zh 广告的大小
     *  @en The ad size
     * @param nativeListener 
     *  @zh 监听器
     *  @en The listener
     */
    load(unitId: string, size: NativeAdTemplateSize, nativeListener?: NativeAdListener) {
        log(module, "load", `unitId = ${unitId}`);
        this.nativeAdListener = nativeListener;
        let req = new LoadNativeAdREQ(unitId);
        req.size = size;
        bridge.sendToNative(js.getClassName(LoadNativeAdREQ), req, js.getClassName(LoadNativeAdACK), (ack: LoadNativeAdACK) => {
            log(module, "load", `LoadNativeAdACK: ${ack}`);
        }, this);
    }

    /**
     * @zh
     * 销毁原生广告
     * @en
     * Destroy the native ad
     */
    destroy() {
        log(module, "destroy");
        this.nativeAdListener = null;
        bridge.sendToNative(js.getClassName(DestroyNativeAdREQ), { unitId: this.unitId }, js.getClassName(DestroyBannerACK), (ack: DestroyNativeAdACK) => {
            log(module, "destroy", `DestroyNativeAdACK = ${ack}`);
        })
    }

    private onNativeLoadedNTF(ntf: NativeLoadedNTF) {
        if (this.nativeAdListener) {
            const listener = this.nativeAdListener as OnNativeAdLoadedListener;
            if (listener && listener.onNativeAdLoaded) {
                listener.onNativeAdLoaded();
            }
        }
    }

    private onNativeAdListenerNTF(ntf: NativeAdListenerNTF) {
        const method = this.nativeAdListener[ntf.method];
        if (method) {
            method(ntf.loadAdError);
        }
    }

    private onPaidEvent(ntf: NativePaidEventNTF) {
        const paid = this.nativeAdListener as OnPaidEventListener<NativePaidEventNTF>;
        if (paid && paid.onPaidEvent) {
            paid.onPaidEvent(ntf);
        }
    }
}