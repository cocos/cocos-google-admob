import { AdError } from "../ads/alias/TypeAlias";
import { Base } from "./Base";
import { ILoadAdError } from "./ICallbackNTF";
import { _decorator  } from "cc";
const { ccclass, property } = _decorator;


@ccclass("LoadRewardedInterstitialAdREQ")
export class LoadRewardedInterstitialAdREQ extends Base {

}

@ccclass("LoadRewardedInterstitialAdACK")
export class LoadRewardedInterstitialAdACK extends Base {

}

@ccclass("ShowRewardedInterstitialAdREQ")
export class ShowRewardedInterstitialAdREQ extends Base {

}

@ccclass("ShowRewardedInterstitialAdACK")
export class ShowRewardedInterstitialAdACK extends Base {

}

@ccclass("RewardedInterstitialAdLoadCallbackNTF")
export class RewardedInterstitialAdLoadCallbackNTF extends Base implements ILoadAdError {
    method?: string;
    loadAdError?: AdError;
}

@ccclass("OnUserEarnedRewardedInterstitialListenerNTF")
export class OnUserEarnedRewardedInterstitialListenerNTF extends Base {
    rewardType: string;
    rewardAmount: number;
}