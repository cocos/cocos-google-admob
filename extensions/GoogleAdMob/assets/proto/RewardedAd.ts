import { Base } from "./Base";
import { IAdError, ILoadAdError } from "./ICallbackNTF";
import { AdError, LoadAdError } from "../ads/alias/TypeAlias";
import { _decorator } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LoadRewardedAdREQ")
export class LoadRewardedAdREQ extends Base { }

@ccclass("LoadRewardedAdACK")
export class LoadRewardedAdACK extends Base implements ILoadAdError {
    method: string;
    loadAdError: LoadAdError
}

@ccclass("ShowRewardedAdREQ")
export class ShowRewardedAdREQ extends Base { }

@ccclass("ShowRewardedAdACK")
export class ShowRewardedAdACK extends Base { }

@ccclass("OnUserEarnedRewardListenerNTF")
export class OnUserEarnedRewardListenerNTF extends Base {
    rewardType: string;
    rewardAmount: number;
}

@ccclass("RewardedAdLoadCallbackNTF")
export class RewardedAdLoadCallbackNTF extends Base implements ILoadAdError {
    method?: string;
    loadAdError?: AdError;
}

@ccclass("RewardedFullScreenContentCallbackNTF")
export class RewardedFullScreenContentCallbackNTF extends Base implements IAdError {
    method: string;
    adError: AdError;
}