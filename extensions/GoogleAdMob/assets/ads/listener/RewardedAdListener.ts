import { RewardedPaidEventNTF } from "../../proto/PaidEventNTF";
import { OnPaidEventListener } from "./OnPaidEventListener";
import { OnUserEarnedRewardListener } from "./OnUserEarnedRewardListener";
import { RewardedAdFullScreenContentCallback } from "./RewardedAdFullScreenContentCallback";
import { RewardedAdLoadCallback } from "./RewardedAdLoadCallback";

/**
 * @zh
 * 激励广告的监听器
 * @en
 * Listener for rewarded ad.
 */
export type RewardedAdListener = RewardedAdLoadCallback | OnUserEarnedRewardListener | RewardedAdFullScreenContentCallback 
| OnPaidEventListener<RewardedPaidEventNTF>;