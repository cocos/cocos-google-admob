import { log } from "cc";
import { bridge } from "../../core/Bridge";
import { route } from "../../core/Route";
import { InterstitialAdLoadCalLBackNTF, InterstitialFullScreenContentCallbackNTF, LoadInterstitialAdACK, LoadInterstitialAdREQ, ShowInterstitialAdACK, ShowInterstitialAdREQ } from "../../proto/InterstitailAd";
import { AdClient } from "./AdClient";
import { InterstitialAdLoadCallback } from "../listener/InterstitialAdLoadCallback";
import { InterstitialFullScreenContentCallback } from "../listener/InterstitialFullScreenContentCallback";

const module = "[InterstitialAdClient]"
export class InterstitialAdClient extends AdClient {

    private _interstitialAdLoadCallback: InterstitialAdLoadCallback;

    set interstitialAdLoadCallback(value: InterstitialAdLoadCallback) {
        if (this._interstitialAdLoadCallback != null) {
            route.off(InterstitialAdLoadCalLBackNTF.name, this.onInterstitialAdLoadCalLBackNTF, this);
        }
        this._interstitialAdLoadCallback = value;
        if (this._interstitialAdLoadCallback) {
            route.on(InterstitialAdLoadCalLBackNTF.name, this.onInterstitialAdLoadCalLBackNTF, this);
        }
    }

    get interstitialAdLoadCallback(): InterstitialAdLoadCallback {
        return this._interstitialAdLoadCallback;
    }

    fullScreenContentCallback: InterstitialFullScreenContentCallback;

    load(unitId: string, interstitialAdLoadCallback?: InterstitialAdLoadCallback) {
        this.destroy();
        log(module, `load, unitId = ${unitId}`);
        this.unitId = unitId;
        this.interstitialAdLoadCallback = interstitialAdLoadCallback;

        let view = this; 
        bridge.sendToNative(LoadInterstitialAdREQ.name, { unitId: unitId }, LoadInterstitialAdACK.name, (ack: LoadInterstitialAdACK) => {

            log(module, `load, LoadInterstitialAdACK, ${ack}`);

            route.on(InterstitialFullScreenContentCallbackNTF.name, this.onInterstitialFullScreenContentCallback, this);

            this.fullScreenContentCallback = {
                onAdDismissedFullScreenContent() {
                    log(module, `onAdDismissedFullScreenContent`);                  
                    view.destroy();
                },
                onAdFailedToShowFullScreenContent(adError) {
                    log(module, `onAdFailedToShowFullScreenContent ${adError}`);
                    view.destroy();
                },
            }
        });
    }

    destroy() {
        log(module, `destroy`);
        this.interstitialAdLoadCallback = null;
        route.off(InterstitialFullScreenContentCallbackNTF.name, this.onInterstitialFullScreenContentCallback, this);      
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
        if (this.interstitialAdLoadCallback) {
            let method = this.interstitialAdLoadCallback[ntf.method];
            if (method) {
                method(ntf.loadAdError);
            }
        }

    }

    private onInterstitialFullScreenContentCallback(ntf: InterstitialFullScreenContentCallbackNTF) {
        log(module, `onInterstitialFullScreenContentCallback, ${ntf}`);
        const method = this.fullScreenContentCallback[ntf.method];
        if (method) {
            method();
        }
    }
}