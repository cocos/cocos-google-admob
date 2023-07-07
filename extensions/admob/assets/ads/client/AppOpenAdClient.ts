import { log } from "cc";
import { bridge } from "../../core/Bridge";
import { route } from "../../core/Route";
import { AppOpenAdLoadCallbackNTF, AppOpenAdFullScreenContentCallbackNTF, ShowAppOpenAdCompleteNTF, LoadAppOpenAdREQ, LoadAppOpenAdACK, IsAdAvailableREQ, IsAdAvailableACK, ShowAppOpenAdREQ as ShowAppOpenAdREQ, ShowAppOpenAdACK } from "../../proto/AppOpenAd";
import { OnShowAdCompleteListener } from "../listener/OnShowAdCompleteListener";
import { AdClient } from "./AdClient";
import { AppOpenAdListener } from "../listener/AppOpenAdListener";
import { AppOpenPaidEventNTF } from "../../proto/PaidEventNTF";
import { OnPaidEventListener } from "../listener/OnPaidEventListener";

const module = "[AppOpenAdClient]";
export class AppOpenAdClient extends AdClient {

    private _appOpenAdListener: AppOpenAdListener

    set appOpenAdListener(value: AppOpenAdListener) {
        if (this._appOpenAdListener) {
            route.off(AppOpenAdLoadCallbackNTF.name, this.onAppOpenAdLoadCallbackNTF, this);
            route.off(AppOpenPaidEventNTF.name, this.onPaidEvent, this);
            route.off(AppOpenAdFullScreenContentCallbackNTF.name, this.onFullScreenContentCallbackNTF, this);
            route.off(ShowAppOpenAdCompleteNTF.name, this.onShowCompleteNTF, this);
        }

        this._appOpenAdListener = value;
        if (value) {
            route.on(AppOpenAdLoadCallbackNTF.name, this.onAppOpenAdLoadCallbackNTF, this);
            route.on(AppOpenPaidEventNTF.name, this.onPaidEvent, this);
            route.on(AppOpenAdFullScreenContentCallbackNTF.name, this.onFullScreenContentCallbackNTF, this);
            route.on(ShowAppOpenAdCompleteNTF.name, this.onShowCompleteNTF, this);
        }
    }

    get appOpenAdListener(): AppOpenAdListener {
        return this._appOpenAdListener;
    }   

    loadAd(unitId: string, appOpenAdListener?: AppOpenAdListener) {
        this.appOpenAdListener = appOpenAdListener;        
        this.unitId = unitId;

        bridge.sendToNative(LoadAppOpenAdREQ.name, { unitId: unitId }, LoadAppOpenAdACK.name, (ack: LoadAppOpenAdACK) => {

        }, this);
    }

    isValid(onComplete: (valid: boolean) => void, thisArg: any) {
        bridge.sendToNative(IsAdAvailableREQ.name, { unitId: this.unitId }, IsAdAvailableACK.name, (ack: IsAdAvailableACK) => {
            log(module, "isValid", ack.valid);
            if (onComplete && thisArg) {
                onComplete.call(thisArg, ack.valid)
            }
        })
    }

    show(onComplete?: () => void) {
        bridge.sendToNative(ShowAppOpenAdREQ.name, { unitId: this.unitId }, ShowAppOpenAdACK.name, (ack: ShowAppOpenAdACK) => {
            log(module, "showAdIfAvailable", ack);
            if (onComplete) {
                onComplete();
            }
        })
    }

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
        if( c && c.onShowAdComplete ){
            c.onShowAdComplete(ntf.unitId);
        }        
    }

    private onPaidEvent(ntf: AppOpenPaidEventNTF) {
        const listener = this.appOpenAdListener as OnPaidEventListener<AppOpenPaidEventNTF>;
        if (listener) {
            listener?.onPaidEvent(ntf);
        }
    }
}