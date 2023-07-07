import { AdError } from "../ads/alias/TypeAlias";
import { Base } from "./Base";
import { ILoadAdError } from "./ICallbackNTF";

export class LoadRewardedInterstitialAdREQ extends Base {

}

export class LoadRewardedInterstitialAdACK extends Base {

}

export class ShowRewardedInterstitialAdREQ extends Base {

}

export class ShowRewardedInterstitialAdACK extends Base {

}

export class RewardedInterstitialAdLoadCallbackNTF extends Base implements ILoadAdError {
    method?: string;
    loadAdError?: AdError;
}

export class OnUserEarnedRewardedInterstitialListenerNTF extends Base {
    rewardType: string;
    rewardAmount: number;
}