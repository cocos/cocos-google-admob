import { OnUserEarnedRewardListener } from "./OnUserEarnedRewardListener";
import { RewardedAdFullScreenContentCallback } from "./RewardedAdFullScreenContentCallback";
import { RewardedAdLoadCallback } from "./RewardedAdLoadCallback";

export type RewardedAdListener = RewardedAdLoadCallback | OnUserEarnedRewardListener | RewardedAdFullScreenContentCallback