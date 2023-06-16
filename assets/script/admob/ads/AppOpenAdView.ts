import { bridge } from "../core/Bridge";
import { route } from "../core/Route";
import { AppOpenAdLoadCallbackNTF, OpenAppAdFullScreenContentCallbackNTF, LoadOpenAppAdACK, LoadOpenAppAdREQ, ShowOpenAppAdACK, ShowOpenAppAdCompleteNTF, ShowOpenAppAdREQ, IsAdAvailableREQ, IsAdAvailableACK } from "../proto/AppOpenAd";
import { AdView } from "./AdView";
import { AppOpenAdLoadCallback } from "./AppOpenAdLoadCallback";
import { OpenAppAdFullScreenContentCallback } from "./OpenAppAdFullScreenContentCallback";
import { OnShowAdComplete } from "./OnShowAdCompleteListener";
import { log } from "cc";

const module = "[AppOpenAdView]";
export class AppOpenAdView extends AdView {

    private _appOpenAdLoadCallback: AppOpenAdLoadCallback

    set appOpenAdLoadCallback(value: AppOpenAdLoadCallback) {
        if (this._appOpenAdLoadCallback) {
            route.off(AppOpenAdLoadCallbackNTF.name, this.onAppOpenAdLoadCallbackNTF, this);
        }

        this._appOpenAdLoadCallback = value;
        route.on(AppOpenAdLoadCallbackNTF.name, this.onAppOpenAdLoadCallbackNTF, this);
    }

    get appOpenAdLoadCallback(): AppOpenAdLoadCallback {
        return this._appOpenAdLoadCallback;
    }

    private _fullscreenContentCallback: OpenAppAdFullScreenContentCallback;

    set fullscreenContentCallback(value: OpenAppAdFullScreenContentCallback) {
        if (this._fullscreenContentCallback) {
            route.off(OpenAppAdFullScreenContentCallbackNTF.name, this.onFullScreenContentCallbackNTF, this);
        }
        this._fullscreenContentCallback = value;
        if (this._fullscreenContentCallback) {
            route.on(OpenAppAdFullScreenContentCallbackNTF.name, this.onFullScreenContentCallbackNTF, this);
        }
    }

    get fullscreenContentCallback(): OpenAppAdFullScreenContentCallback {
        return this._fullscreenContentCallback;
    }

    private _onShowApComplete: OnShowAdComplete;

    set onShowApComplete(value: OnShowAdComplete) {
        if (this.onShowApComplete) {
            route.off(ShowOpenAppAdCompleteNTF.name, this.onShowCompleteNTF, this);
        }
        this._onShowApComplete = value;
        if (this.onShowApComplete) {
            route.on(ShowOpenAppAdCompleteNTF.name, this.onShowCompleteNTF, this);
        }
    }

    get onShowApComplete(): OnShowAdComplete {
        return this._onShowApComplete;
    }

    loadAd(unitId: string, appOpenAdLoadCallback?: AppOpenAdLoadCallback, fullscreenContentCallback?: OpenAppAdFullScreenContentCallback) {
        this.appOpenAdLoadCallback = appOpenAdLoadCallback;
        this.fullscreenContentCallback = fullscreenContentCallback;
        this.unitId = unitId;

        bridge.sendToNative(LoadOpenAppAdREQ.name, { unitId: unitId }, LoadOpenAppAdACK.name, (ack: LoadOpenAppAdACK) => {

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
        bridge.sendToNative(ShowOpenAppAdREQ.name, { unitId: this.unitId }, ShowOpenAppAdACK.name, (ack: ShowOpenAppAdACK) => {
            log(module, "showAdIfAvailable", ack);
            if (onComplete) {
                onComplete();
            }
        })
    }

    destroy() {
        this.appOpenAdLoadCallback = null;;
        this.fullscreenContentCallback = null;
        this.onShowApComplete = null;
    }

    isAdAvailable(onShowApComplete: OnShowAdComplete) {
        this.onShowApComplete = onShowApComplete;
    }

    private onAppOpenAdLoadCallbackNTF(ntf: AppOpenAdLoadCallbackNTF) {
        if (this.appOpenAdLoadCallback) {
            let method = this.appOpenAdLoadCallback[ntf.method];
            if (method) {
                method(ntf.loadAdError);
            }
        }
    }

    private onFullScreenContentCallbackNTF(ntf: OpenAppAdFullScreenContentCallbackNTF) {
        if (ntf && ntf.method && this.fullscreenContentCallback) {
            let method = this.fullscreenContentCallback[ntf.method];
            if (method) {
                method(ntf.adError);
            }
        }
    }

    private onShowCompleteNTF(ntf: ShowOpenAppAdCompleteNTF) {
        this.onShowApComplete?.onShowAdComplete(ntf.unitId);
    }
}