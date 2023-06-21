import { log } from "cc";
import { bridge } from "../../core/Bridge";
import { LoadRewardedAdACK, LoadRewardedAdREQ, OnUserEarnedRewardListenerNTF, RewardedAdLoadCallbackNTF, RewardedFullScreenContentCallbackNTF, ShowRewardedAdACK, ShowRewardedAdREQ } from "../../proto/RewardedAd";
import { AdClient } from "./AdClient";
import { route } from "../../core/Route";
import { OnUserEarnedRewardListener } from "../listener/OnUserEarnedRewardListener";
import { RewardedAdListener } from "../listener/RewardedAdListener";

const module = "[RewardedAdClient]"
export class RewardedAdClient extends AdClient {

    private _rewardedListener: RewardedAdListener;

    public set rewardedListener(value: RewardedAdListener) {
        if (this._rewardedListener) {
            route.off(RewardedAdLoadCallbackNTF.name, this.onRewardedAdLoadCallbackNTF, this);
            route.off(RewardedFullScreenContentCallbackNTF.name, this.onFullScreenContentCallback, this);
            route.off(OnUserEarnedRewardListenerNTF.name, this.onOnUserEarnedRewardListenerNTF, this);
        }
        this._rewardedListener = value;

        if (this._rewardedListener) {
            route.on(RewardedAdLoadCallbackNTF.name, this.onRewardedAdLoadCallbackNTF, this);
            route.on(RewardedFullScreenContentCallbackNTF.name, this.onFullScreenContentCallback, this);
            route.on(OnUserEarnedRewardListenerNTF.name, this.onOnUserEarnedRewardListenerNTF, this);
        }
    }
    public get rewardedListener(): RewardedAdListener {
        return this._rewardedListener;
    }

    load(unitId: string, rewardedListener: RewardedAdListener) {
        log(module, `load, unitId = ${unitId}`);
        this.unitId = unitId;
        this.rewardedListener = rewardedListener;
        bridge.sendToNative(LoadRewardedAdREQ.name, { unitId: unitId }, LoadRewardedAdACK.name, (ack: LoadRewardedAdACK) => {
            log(module, `LoadRewardedAdACK, ${ack}`);            
        }, this);
    }

    destroy() {
        log(module, `destroy`);
        this.rewardedListener = null;        
    }

    show() {
        log(module, `show`);
        bridge.sendToNative(ShowRewardedAdREQ.name, { unitId: this.unitId }, ShowRewardedAdACK.name, (ack: ShowRewardedAdACK) => {
            log(module, `ShowRewardedAdREQ, ${ack}`);
        }, this);
    }

    private onRewardedAdLoadCallbackNTF(ntf: RewardedAdLoadCallbackNTF) {
        log(module, `onRewardedAdLoadCallbackNTF`);
        if (this.rewardedListener) {
            const method = this.rewardedListener[ntf.method]
            if (method) {
                method();
            }
        }
    }

    private onFullScreenContentCallback(ntf: RewardedFullScreenContentCallbackNTF) {
        log(module, `onFullScreenContentCallback`);
        if (this.rewardedListener) {
            let method = this.rewardedListener[ntf.method];
            if (method) {
                method(ntf.adError);
            }
        }
    }

    private onOnUserEarnedRewardListenerNTF(ntf: OnUserEarnedRewardListenerNTF) {
        log(module, `onOnUserEarnedRewardListenerNTF`);
        if (this.rewardedListener) {
            const onUserEarnedRewardListener: OnUserEarnedRewardListener = this.rewardedListener as OnUserEarnedRewardListener;
            if (onUserEarnedRewardListener && onUserEarnedRewardListener.onEarn) {
                onUserEarnedRewardListener.onEarn(ntf.rewardType, ntf.rewardAmount);
            }
        }
    }
}