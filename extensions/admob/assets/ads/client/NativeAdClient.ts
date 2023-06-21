import { log } from "cc";
import { bridge } from "../../core/Bridge";
import { DestroyBannerACK, LoadBannerACK } from "../../proto/BannerAd";
import { DestroyNativeAdACK, DestroyNativeAdREQ, LoadNativeAdACK, LoadNativeAdREQ, NativeAdListenerNTF, NativeAdTemplateSize, NativeLoadedNTF } from "../../proto/NativeAd";
import { AdClient } from "./AdClient";
import { NativeAdListener } from "../listener/NativeAdListener";
import { route } from "../../core/Route";
import { OnNativeAdLoadedListener } from "../listener/OnNativeAdLoadedListener";

const module = "[NativeAdClient]";
export class NativeAdClient extends AdClient {

    private _nativeAdListener: NativeAdListener;

    get nativeAdListener(): NativeAdListener {
        return this._nativeAdListener;
    }
    set nativeAdListener(value: NativeAdListener) {
        if (this._nativeAdListener) {
            route.off(NativeLoadedNTF.name, this.onNativeLoadedNTF, this);
            route.off(NativeAdListenerNTF.name, this.onNativeAdListenerNTF, this);

        }
        this._nativeAdListener = value;
        if (this._nativeAdListener) {
            route.on(NativeLoadedNTF.name, this.onNativeLoadedNTF, this);
            route.on(NativeAdListenerNTF.name, this.onNativeAdListenerNTF, this);
        }
    }

    load(unitId: string, size: NativeAdTemplateSize, nativeListener?: NativeAdListener) {
        log(module, "load", `unitId = ${unitId}`);
        this.nativeAdListener = nativeListener;
        let req = new LoadNativeAdREQ(unitId);
        req.size = size;
        bridge.sendToNative(LoadNativeAdREQ.name, req, LoadNativeAdACK.name, (ack: LoadNativeAdACK) => {
            log(module, "load", `LoadNativeAdACK: ${ack}`);
        }, this);
    }

    destroy() {
        log(module, "destroy");
        this.nativeAdListener = null;
        bridge.sendToNative(DestroyNativeAdREQ.name, { unitId: this.unitId }, DestroyBannerACK.name, (ack: DestroyNativeAdACK) => {
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
}