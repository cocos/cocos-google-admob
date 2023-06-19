import { log } from "cc";
import { AdClient } from "./AdClient";
import { LoadRewardedInterstitialAdACK, LoadRewardedInterstitialAdREQ, OnUserEarnedRewardedInterstitialListenerNTF, RewardedInterstitialAdLoadCallbackNTF, ShowRewardedInterstitialAdACK, ShowRewardedInterstitialAdREQ } from "../../proto/RewardedInterstitialAd";
import { bridge } from "../../core/Bridge";
import { route } from "../../core/Route";
import { RewardedInterstitialListener } from "../listener/RewardedInterstitialListener";
import { OnUserEarnedRewardListener } from "../listener/OnUserEarnedRewardListener";

const module = "[RewardedInterstitialAdClient]";
export class RewardedInterstitialAdClient extends AdClient {

    private _rewardedInterstitialListener: RewardedInterstitialListener

    set rewardedInterstitialListener(value: RewardedInterstitialListener) {
        if (this._rewardedInterstitialListener) {
            route.off(RewardedInterstitialAdLoadCallbackNTF.name, this.onRewardedInterstitialAdLoadCallback, this);
            route.off(OnUserEarnedRewardedInterstitialListenerNTF.name, this.onOnUserEarnedRewardListenerNTF, this);
        }

        this._rewardedInterstitialListener = value;
        if (this._rewardedInterstitialListener) {
            route.on(RewardedInterstitialAdLoadCallbackNTF.name, this.onRewardedInterstitialAdLoadCallback, this);
            route.on(OnUserEarnedRewardedInterstitialListenerNTF.name, this.onOnUserEarnedRewardListenerNTF, this);
        }
    }
    get rewardedInterstitialListener(): RewardedInterstitialListener {
        return this._rewardedInterstitialListener;
    }

    load(unitId: string, listener: RewardedInterstitialListener) {
        this.destroy();
        this.unitId = unitId;
        this._rewardedInterstitialListener = listener;
        bridge.sendToNative(LoadRewardedInterstitialAdREQ.name, { unitId: unitId },
            LoadRewardedInterstitialAdACK.name,
            (ack: LoadRewardedInterstitialAdACK) => {

            }, this);
    }

    destroy() {
        this._rewardedInterstitialListener = null;
    }

    show() {
        bridge.sendToNative(ShowRewardedInterstitialAdREQ.name, { unitId: this.unitId }, ShowRewardedInterstitialAdACK.name,
            (ack: ShowRewardedInterstitialAdACK) => {

            }, this);
    }

    private onRewardedInterstitialAdLoadCallback(ntf: RewardedInterstitialAdLoadCallbackNTF) {
        const method = this._rewardedInterstitialListener[ntf.method];
        if (method) {
            method(ntf.loadAdError);
        }
    }

    private onOnUserEarnedRewardListenerNTF(ntf: OnUserEarnedRewardedInterstitialListenerNTF) {
        log(module, `onOnUserEarnedRewardListenerNTF`);
        if (this._rewardedInterstitialListener) {
            const onEarn = this._rewardedInterstitialListener as OnUserEarnedRewardListener;
            if (onEarn && onEarn.onEarn) {
                onEarn.onEarn(ntf.rewardType, ntf.rewardAmount);
            }
        }
    }
}