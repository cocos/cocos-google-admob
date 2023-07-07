import { log } from "cc";
import { bridge } from "../../core/Bridge";
import { route } from "../../core/Route";
import { InterstitialAdLoadCalLBackNTF, InterstitialFullScreenContentCallbackNTF, LoadInterstitialAdACK, LoadInterstitialAdREQ, ShowInterstitialAdACK, ShowInterstitialAdREQ } from "../../proto/InterstitailAd";
import { AdClient } from "./AdClient";
import { InterstitialAdListener } from "../listener/InterstitialAdListener";
import { InterstitialPaidEventNTF } from "../../proto/PaidEventNTF";
import { OnPaidEventListener } from "../listener/OnPaidEventListener";

const module = "[InterstitialAdClient]"
export class InterstitialAdClient extends AdClient {

    private _interstitialListener: InterstitialAdListener;
    get interstitialListener(): InterstitialAdListener {
        return this._interstitialListener;
    }
    set interstitialListener(value: InterstitialAdListener) {
        if (!value) {
            route.off(InterstitialFullScreenContentCallbackNTF.name, this.onInterstitialFullScreenContentCallback, this);
            route.off(InterstitialAdLoadCalLBackNTF.name, this.onInterstitialAdLoadCalLBackNTF, this);
            route.off(InterstitialPaidEventNTF.name, this.onPaidEvent, this);
        }

        this._interstitialListener = value;

        if (value) {
            route.on(InterstitialFullScreenContentCallbackNTF.name, this.onInterstitialFullScreenContentCallback, this);
            route.on(InterstitialAdLoadCalLBackNTF.name, this.onInterstitialAdLoadCalLBackNTF, this);
            route.on(InterstitialPaidEventNTF.name, this.onPaidEvent, this);
        }
    }

    load(unitId: string, interstitialListener?: InterstitialAdListener) {
        this.destroy();
        log(module, `load, unitId = ${unitId}`);
        this.unitId = unitId;
        this.interstitialListener = interstitialListener;

        bridge.sendToNative(LoadInterstitialAdREQ.name, { unitId: unitId }, LoadInterstitialAdACK.name, (ack: LoadInterstitialAdACK) => {
            log(module, `load, LoadInterstitialAdACK, ${ack}`);
        });
    }

    destroy() {
        log(module, `destroy`);
        this.interstitialListener = null;        
    }

    show(onComplete?: () => void) {
        log(module, `show`);
        bridge.sendToNative(ShowInterstitialAdREQ.name, { unitId: this.unitId }, ShowInterstitialAdACK.name, (ack: ShowInterstitialAdACK) => {
            if (onComplete) {
                onComplete();
            }
        });
    }

    private onInterstitialAdLoadCalLBackNTF(ntf: InterstitialAdLoadCalLBackNTF) {
        log(module, `onInterstitialAdLoadCalLBackNTF, ${ntf}`);
        if (this.interstitialListener) {
            let method = this.interstitialListener[ntf.method];
            if (method) {
                method(ntf.loadAdError);
            }
        }
    }

    private onInterstitialFullScreenContentCallback(ntf: InterstitialFullScreenContentCallbackNTF) {
        log(module, `onInterstitialFullScreenContentCallback, ${ntf}`);
        const method = this.interstitialListener[ntf.method];
        if (method) {
            method();
        }
    }

    private onPaidEvent(ntf:InterstitialPaidEventNTF){
        const listener = this.interstitialListener as OnPaidEventListener<InterstitialPaidEventNTF>;
        if(listener){
            listener?.onPaidEvent(ntf);
        }        
    }
}