import { OnUserEarnedRewardListener } from "./OnUserEarnedRewardListener";
import { RewardedInterstitialAdLoadCallback } from "./RewardedInterstitialAdLoadCallback";
import { RewardedInterstitialFullScreenContentCallback } from "./RewardedInterstitialFullScreenContentCallback";

export type RewardedInterstitialListener = RewardedInterstitialAdLoadCallback
    | OnUserEarnedRewardListener
    | RewardedInterstitialFullScreenContentCallback;