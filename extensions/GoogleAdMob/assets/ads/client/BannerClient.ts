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
import { AdClient } from "./AdClient";
import { BannerAdListenerNTF, ShowBannerREQ, LoadBannerREQ, LoadBannerACK, DestroyBannerREQ, DestroyBannerACK } from "../../proto/BannerAd";
import { log,js } from "cc";
import { bridge } from "../../core/Bridge";
import { route } from "../../core/Route";
import { BannerSize } from "../../misc/BannerSize";
import { BottomCenter } from "../../misc/BannerAlignment";
import { BannerSizeOption } from "../../misc/BannerSizeOption";
import { BannerAdListener } from "../listener/BannerAdListener";
import { BannerPaidEventNTF } from "../../proto/PaidEventNTF";
import { OnPaidEventListener } from "../listener/OnPaidEventListener";
import { BannerSizeType } from "../../misc/BannerSizeType";

/**
 * @zh
 * 横幅的客户端
 * @en
 * TS client for Banner ad.
 */
const module = "[BannerClient]"
export class BannerClient extends AdClient {

    /**
     * @zh
     * Banner 的事件监听器，由多种监听器联合
     * @en
     * Union of all banner events listener
     */
    private _adListener: BannerAdListener = null;

    /**
     * @zh
     * Banner 的事件监听器，由多种监听器联合
     * @en
     * Union of all banner events listener
     */
    public get adListener(): BannerAdListener {
        return this._adListener;
    }

    /**
     * @zh
     * Banner 的事件监听器，由多种监听器联合
     * @en
     * Union of all banner events listener
     */
    public set adListener(v: BannerAdListener) {
        if (this._adListener) {
            route.off(js.getClassName(BannerAdListenerNTF), this.onAdListenerEvent, this);
            route.off(js.getClassName(BannerPaidEventNTF), this.onPaidEvent, this);
        }
        this._adListener = v;
        if (this._adListener) {
            route.on(js.getClassName(BannerAdListenerNTF), this.onAdListenerEvent, this);
            route.on(js.getClassName(BannerPaidEventNTF), this.onPaidEvent, this);
        }
    }

    /**
     * @zh
     * 展示横幅
     * @en
     * Show banner 
     * @param visible 
     *  @zh 横幅的可见性
     *  @en Visibility of the banner
     */
    show(visible: boolean) {
        let req = new ShowBannerREQ(this.unitId);
        req.visible = visible;
        bridge.sendToNative(js.getClassName(ShowBannerREQ), req);
    }

    /**
     * @zh
     * 加载横幅
     * 加载后会自动展示
     * @en
     * Load the banner 
     * The banner will be visible automatically
     * @param unitId 
     * @param adListener 
     * @param opt 
     */
    load(unitId: string, adListener?: BannerAdListener, opt?: BannerSizeOption) {
        this.adListener = adListener;
        this.unitId = unitId
        bridge.sendToNative(js.getClassName(LoadBannerREQ),
            {
                unitId: unitId,
                bannerSize: opt?.size ? opt?.size : BannerSize.BANNER,
                alignments: opt?.alignments ? opt?.alignments : BottomCenter,
                bannerSizeType:opt?.type ? opt?.type : BannerSizeType.Builtin,
            },
            js.getClassName(LoadBannerACK), (response: LoadBannerACK) => {
            }, this);
    }

    /**
     * @zh
     * 销毁横幅广告
     * @en
     * Destroy the banner id
     */
    destroy() {
        log(module, "destroy", this.unitId);
        let req = new DestroyBannerREQ(this.unitId);
        this.adListener = null;
        bridge.sendToNative(js.getClassName(DestroyBannerREQ), req, js.getClassName(DestroyBannerACK), (response: DestroyBannerACK) => {
        });
    }

    private onAdListenerEvent(ntf: BannerAdListenerNTF) {
        if (this.adListener) {
            const method = this.adListener[ntf.method];
            if (method && typeof (method) == "function") {
                method(ntf.loadAdError);
            }
        }
    }

    private onPaidEvent(ntf: BannerPaidEventNTF) {
        const listener = this.adListener as OnPaidEventListener<BannerPaidEventNTF>;
        if (listener && listener.onPaidEvent) {
            listener.onPaidEvent(ntf);
        }
    }
}