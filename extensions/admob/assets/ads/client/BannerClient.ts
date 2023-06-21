import { AdClient } from "./AdClient";
import { AdListener } from "../listener/AdListener";
import { BannerAdListenerNTF, ShowBannerREQ, LoadBannerREQ, LoadBannerACK, DestroyBannerREQ, DestroyBannerACK } from "../../proto/BannerAd";
import { log } from "cc";
import { bridge } from "../../core/Bridge";
import { route } from "../../core/Route";
import { BannerSize } from "../../misc/BannerSize";
import { BottomCenter } from "../../misc/BannerAlignment";
import { BannerSizeOption } from "../../misc/BannerSizeOption";

const module = "[BannerClient]"
export class BannerClient extends AdClient {

    private _adListener: AdListener = null;
    public get adListener(): AdListener {
        return this._adListener;
    }
    public set adListener(v: AdListener) {
        if (this._adListener) {
            route.off(BannerAdListenerNTF.name, this.onAdListenerEvent, this);
        }
        this._adListener = v;
        if (this._adListener) {
            route.on(BannerAdListenerNTF.name, this.onAdListenerEvent, this);
        }
    }

    show(visible: boolean) {
        let req = new ShowBannerREQ(this.unitId);
        req.visible = visible;
        bridge.sendToNative(ShowBannerREQ.name, { unitId: this.unitId });
    }

    load(unitId: string, adListener?: AdListener, opt?: BannerSizeOption) {
        this.adListener = adListener;
        this.unitId = unitId;
        bridge.sendToNative(LoadBannerREQ.name,
            {
                unitId: unitId,
                bannerSize: opt?.size ? opt?.size : BannerSize.BANNER,
                alignments: opt?.alignments ? opt?.alignments : BottomCenter,                
            },
            LoadBannerACK.name, (response: LoadBannerACK) => {
            }, this);
    }

    destroy() {
        log(module, "destroy", this.unitId);
        let req = new DestroyBannerREQ(this.unitId);
        this.adListener = null;
        bridge.sendToNative(DestroyBannerREQ.name, req, DestroyBannerACK.name, (response: DestroyBannerACK) => {
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
}