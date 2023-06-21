import { Base } from "./Base";
import { IAdError, ILoadAdError } from "./ICallbackNTF";
import { AdError, LoadAdError } from "../ads/alias/TypeAlias";

export class LoadRewardedAdREQ extends Base { }

export class LoadRewardedAdACK extends Base implements ILoadAdError {
    method: string;
    loadAdError: LoadAdError
}

export class ShowRewardedAdREQ extends Base { }
export class ShowRewardedAdACK extends Base { }

export class OnUserEarnedRewardListenerNTF extends Base {
    rewardType: string;
    rewardAmount: number;
}

export class RewardedAdLoadCallbackNTF extends Base implements ILoadAdError {
    method?: string;
    loadAdError?: AdError;
}

export class RewardedFullScreenContentCallbackNTF extends Base implements IAdError {
    method: string;
    adError: AdError;
}