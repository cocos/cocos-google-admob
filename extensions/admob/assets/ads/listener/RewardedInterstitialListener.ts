import { RewardedInterstitialPaidEventNTF } from "../../proto/PaidEventNTF";
import { OnPaidEventListener } from "./OnPaidEventListener";
import { OnUserEarnedRewardListener } from "./OnUserEarnedRewardListener";
import { RewardedInterstitialAdLoadCallback } from "./RewardedInterstitialAdLoadCallback";
import { RewardedInterstitialFullScreenContentCallback } from "./RewardedInterstitialFullScreenContentCallback";

export type RewardedInterstitialListener = RewardedInterstitialAdLoadCallback
    | OnUserEarnedRewardListener
    | RewardedInterstitialFullScreenContentCallback
    | OnPaidEventListener<RewardedInterstitialPaidEventNTF>;