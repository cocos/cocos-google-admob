import { RewardedPaidEventNTF } from "../../proto/PaidEventNTF";
import { OnPaidEventListener } from "./OnPaidEventListener";
import { OnUserEarnedRewardListener } from "./OnUserEarnedRewardListener";
import { RewardedAdFullScreenContentCallback } from "./RewardedAdFullScreenContentCallback";
import { RewardedAdLoadCallback } from "./RewardedAdLoadCallback";

export type RewardedAdListener = RewardedAdLoadCallback | OnUserEarnedRewardListener | RewardedAdFullScreenContentCallback 
| OnPaidEventListener<RewardedPaidEventNTF>;