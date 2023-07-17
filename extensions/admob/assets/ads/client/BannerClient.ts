import { AdClient } from "./AdClient";
import { BannerAdListenerNTF, ShowBannerREQ, LoadBannerREQ, LoadBannerACK, DestroyBannerREQ, DestroyBannerACK} from "../../proto/BannerAd";
import { log } from "cc";
import { bridge } from "../../core/Bridge";
import { route } from "../../core/Route";
import { BannerSize } from "../../misc/BannerSize";
import { BottomCenter } from "../../misc/BannerAlignment";
import { BannerSizeOption } from "../../misc/BannerSizeOption";
import { BannerAdListener } from "../listener/BannerAdListener";
import { BannerPaidEventNTF } from "../../proto/PaidEventNTF";
import { OnPaidEventListener } from "../listener/OnPaidEventListener";

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
            route.off(BannerAdListenerNTF.name, this.onAdListenerEvent, this);
            route.off(BannerPaidEventNTF.name, this.onPaidEvent, this);
        }
        this._adListener = v;
        if (this._adListener) {
            route.on(BannerAdListenerNTF.name, this.onAdListenerEvent, this);
            route.on(BannerPaidEventNTF.name, this.onPaidEvent, this);
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
        bridge.sendToNative(ShowBannerREQ.name, { unitId: this.unitId });
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

    private onPaidEvent(ntf:BannerPaidEventNTF){
        const listener = this.adListener as OnPaidEventListener<BannerPaidEventNTF>;
        if(listener){
            listener?.onPaidEvent(ntf);
        }        
    }
}