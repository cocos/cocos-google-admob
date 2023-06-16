import { log } from "cc";
import { bridge } from "../core/Bridge";
import { LoadBannerACK } from "../proto/BannerAd";
import { LoadRewardedAdACK, LoadRewardedAdREQ, OnUserEarnedRewardListenerNTF, RewardedAdLoadCallbackNTF, RewardedFullScreenContentCallbackNTF, ShowRewardedAdACK, ShowRewardedAdREQ } from "../proto/RewardedAd";
import { AdView } from "./AdView";
import { OnUserEarnedRewardListener } from "./OnUserEarnedRewardListener";
import { RewardedAdLoadCallback } from "./RewardedAdLoadCallback";
import { RewardedAdFullScreenContentCallback } from "./RewardedAdFullScreenContentCallback";
import { route } from "../core/Route";

const module = "[RewardedAdView]"
export class RewardedAdView extends AdView {

    private _onUserEarnedRewardListener: OnUserEarnedRewardListener;

    get onUserEarnedRewardListener(): OnUserEarnedRewardListener {
        return this._onUserEarnedRewardListener;
    }
    set onUserEarnedRewardListener(value: OnUserEarnedRewardListener) {
        if (this._onUserEarnedRewardListener) {
            route.off(OnUserEarnedRewardListenerNTF.name, this.onOnUserEarnedRewardListenerNTF, this);
        }
        this._onUserEarnedRewardListener = value;
        if (this._onUserEarnedRewardListener) {
            route.on(OnUserEarnedRewardListenerNTF.name, this.onOnUserEarnedRewardListenerNTF, this);
        }
    }

    private _fullScreenContentCallback: RewardedAdFullScreenContentCallback;
    get fullScreenContentCallback(): RewardedAdFullScreenContentCallback {
        return this._fullScreenContentCallback;
    }
    set fullScreenContentCallback(value: RewardedAdFullScreenContentCallback) {
        this._fullScreenContentCallback = value;
    }

    private _rewardedAdLoadCallback: RewardedAdLoadCallback;

    get rewardedAdLoadCallback(): RewardedAdLoadCallback {
        return this._rewardedAdLoadCallback;
    }

    set rewardedAdLoadCallback(value: RewardedAdLoadCallback) {
        if (this._rewardedAdLoadCallback) {
            route.off(RewardedAdLoadCallbackNTF.name, this.onRewardedAdLoadCallbackNTF, this);
        }
        this._rewardedAdLoadCallback = value;
        if (this._rewardedAdLoadCallback) {
            route.on(RewardedAdLoadCallbackNTF.name, this.onRewardedAdLoadCallbackNTF, this);
        }
    }

    load(unitId: string, rewardedAdLoadCallback: RewardedAdLoadCallback, onUserEarnedRewardListener?: OnUserEarnedRewardListener) {
        log(module, `load, unitId = ${unitId}`);
        this.unitId = unitId;
        this.onUserEarnedRewardListener = onUserEarnedRewardListener;
        bridge.sendToNative(LoadRewardedAdREQ.name, { unitId: unitId }, LoadRewardedAdACK.name, (ack: LoadRewardedAdACK) => {
            log(module, `LoadRewardedAdACK, ${ack}`);
            this.rewardedAdLoadCallback = rewardedAdLoadCallback;
            route.on(RewardedFullScreenContentCallbackNTF.name, this.onFullScreenContentCallback, this);
        }, this);
    }

    destroy() {
        log(module, `destroy`);
        route.off(RewardedFullScreenContentCallbackNTF.name, this.onFullScreenContentCallback, this);
        this.onUserEarnedRewardListener = null;
        this.rewardedAdLoadCallback = null;
        this.fullScreenContentCallback = null;
    }

    show() {
        log(module, `show`);
        bridge.sendToNative(ShowRewardedAdREQ.name, { unitId: this.unitId }, ShowRewardedAdACK.name, (ack: ShowRewardedAdACK) => {
            log(module, `ShowRewardedAdREQ, ${ack}`);            
        }, this);
    }

    private onRewardedAdLoadCallbackNTF(ntf: RewardedAdLoadCallbackNTF) {
        log(module, `onRewardedAdLoadCallbackNTF`);
        if (this.rewardedAdLoadCallback) {
            const method = this.rewardedAdLoadCallback[ntf.method]
            if (method) {
                method();
            }
        }
    }

    private onFullScreenContentCallback() {
        log(module, `onFullScreenContentCallback`);
    }

    private onOnUserEarnedRewardListenerNTF(ntf: OnUserEarnedRewardListenerNTF) {
        log(module, `onOnUserEarnedRewardListenerNTF`);
        if (this.onUserEarnedRewardListener && this.onUserEarnedRewardListener.onEarn) {
            this.onUserEarnedRewardListener.onEarn(ntf.rewardType, ntf.rewardAmount);
        }
    }
}