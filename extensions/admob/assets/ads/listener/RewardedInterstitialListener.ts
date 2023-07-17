import { RewardedInterstitialPaidEventNTF } from "../../proto/PaidEventNTF";
import { OnPaidEventListener } from "./OnPaidEventListener";
import { OnUserEarnedRewardListener } from "./OnUserEarnedRewardListener";
import { RewardedInterstitialAdLoadCallback } from "./RewardedInterstitialAdLoadCallback";
import { RewardedInterstitialFullScreenContentCallback } from "./RewardedInterstitialFullScreenContentCallback";

/**
 * @zh
 * 插页式激励广告的监听器联合类型
 * @en
 * Union for all rewarded interstitial ad.
 */
export type RewardedInterstitialListener = RewardedInterstitialAdLoadCallback
    | OnUserEarnedRewardListener
    | RewardedInterstitialFullScreenContentCallback
    | OnPaidEventListener<RewardedInterstitialPaidEventNTF>;