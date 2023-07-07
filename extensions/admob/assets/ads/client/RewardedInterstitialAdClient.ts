import { log } from "cc";
import { AdClient } from "./AdClient";
import { LoadRewardedInterstitialAdACK, LoadRewardedInterstitialAdREQ, OnUserEarnedRewardedInterstitialListenerNTF, RewardedInterstitialAdLoadCallbackNTF, ShowRewardedInterstitialAdACK, ShowRewardedInterstitialAdREQ } from "../../proto/RewardedInterstitialAd";
import { bridge } from "../../core/Bridge";
import { route } from "../../core/Route";
import { RewardedInterstitialListener } from "../listener/RewardedInterstitialListener";
import { OnUserEarnedRewardListener } from "../listener/OnUserEarnedRewardListener";
import { RewardedInterstitialPaidEventNTF } from "../../proto/PaidEventNTF";
import { OnPaidEventListener } from "../listener/OnPaidEventListener";

const module = "[RewardedInterstitialAdClient]";
export class RewardedInterstitialAdClient extends AdClient {

    private _rewardedInterstitialListener: RewardedInterstitialListener

    set rewardedInterstitialListener(value: RewardedInterstitialListener) {
        if (this._rewardedInterstitialListener) {
            route.off(RewardedInterstitialAdLoadCallbackNTF.name, this.onRewardedInterstitialAdLoadCallbackNTF, this);
            route.off(OnUserEarnedRewardedInterstitialListenerNTF.name, this.onOnUserEarnedRewardListenerNTF, this);
            route.off(RewardedInterstitialPaidEventNTF.name, this.onPaidEvent, this);
        }

        this._rewardedInterstitialListener = value;
        if (this._rewardedInterstitialListener) {
            route.on(RewardedInterstitialAdLoadCallbackNTF.name, this.onRewardedInterstitialAdLoadCallbackNTF, this);
            route.on(OnUserEarnedRewardedInterstitialListenerNTF.name, this.onOnUserEarnedRewardListenerNTF, this);
            route.on(RewardedInterstitialPaidEventNTF.name, this.onPaidEvent, this);
        }
    }
    get rewardedInterstitialListener(): RewardedInterstitialListener {
        return this._rewardedInterstitialListener;
    }

    load(unitId: string, listener: RewardedInterstitialListener) {
        this.destroy();
        this.unitId = unitId;
        this.rewardedInterstitialListener = listener;
        bridge.sendToNative(LoadRewardedInterstitialAdREQ.name, { unitId: unitId },
            LoadRewardedInterstitialAdACK.name,
            (ack: LoadRewardedInterstitialAdACK) => {

            }, this);
    }

    destroy() {
        this.rewardedInterstitialListener = null;
    }

    show() {
        bridge.sendToNative(ShowRewardedInterstitialAdREQ.name, { unitId: this.unitId }, ShowRewardedInterstitialAdACK.name,
            (ack: ShowRewardedInterstitialAdACK) => {

            }, this);
    }

    private onRewardedInterstitialAdLoadCallbackNTF(ntf: RewardedInterstitialAdLoadCallbackNTF) {
        log(module, "onRewardedInterstitialAdLoadCallbackNTF", ntf.method);
        const method = this.rewardedInterstitialListener[ntf.method];
        if (method) {
            method(ntf.loadAdError);
        }
    }

    private onOnUserEarnedRewardListenerNTF(ntf: OnUserEarnedRewardedInterstitialListenerNTF) {
        log(module, `onOnUserEarnedRewardListenerNTF`);
        if (this.rewardedInterstitialListener) {
            const onEarn = this.rewardedInterstitialListener as OnUserEarnedRewardListener;
            if (onEarn && onEarn.onEarn) {
                onEarn.onEarn(ntf.rewardType, ntf.rewardAmount);
            }
        }
    }

    private onPaidEvent(ntf: RewardedInterstitialPaidEventNTF) {
        const paid = this.rewardedInterstitialListener as OnPaidEventListener<RewardedInterstitialPaidEventNTF>;
        if (paid) {
            paid?.onPaidEvent(ntf);
        }
    }
}