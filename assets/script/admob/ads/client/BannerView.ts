import { Size } from "cc";
import { AdClient } from "./AdClient";
import { AdListener } from "../listener/AdListener";
import { SetBannerSizeREQ, BannerAdListenerNTF, CreateBannerViewREQ, CreateBannerViewACK, ShowBannerREQ, LoadBannerREQ, LoadBannerACK, DestroyBannerREQ, DestroyBannerACK } from "../../proto/BannerAd";
import { log } from "cc";
import { bridge } from "../../core/Bridge";
import { route } from "../../core/Route";

const module = "[BannerClient]"
export class BannerClient extends AdClient {

    static OnDestroyed = 'OnDestroyed';

    private _size: Size;

    set size(value: Size) {
        if (this.isLoaded) {
            throw new Error(`the size can not be set after loaded.`);
        }
        this._size = value;

        let req = new SetBannerSizeREQ(this.unitId);
        req.x = this.size.x;
        req.y = this.size.y;
        bridge.sendToNative(SetBannerSizeREQ.name, req);
    }

    get size(): Size {
        return this.size;
    }

    isLoaded: boolean = false;

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

    create(unitId: string, adListener?: AdListener) {
        this.unitId = unitId;
        bridge.sendToNative(CreateBannerViewREQ.name, { unitId: unitId }, CreateBannerViewACK.name, (ack: CreateBannerViewACK) => {
            this.load(adListener);
        }, this);
    }

    show(visible: boolean) {
        let req = new ShowBannerREQ(this.unitId);
        req.visible = visible;
        bridge.sendToNative(ShowBannerREQ.name, { unitId: this.unitId });
    }

    load(adListener?: AdListener) {
        this.adListener = adListener;
        this.isLoaded = true;
        let req = new LoadBannerREQ(this.unitId);
        bridge.sendToNative(LoadBannerREQ.name, req, LoadBannerACK.name, (response: LoadBannerACK) => {
        }, this);
    }

    destroy() {
        log(module, "destroy", this.unitId);
        let req = new DestroyBannerREQ(this.unitId);
        this.adListener = null;
        bridge.sendToNative(DestroyBannerREQ.name, req, DestroyBannerACK.name, (response: DestroyBannerACK) => {
            this.emit(BannerClient.OnDestroyed, this);
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