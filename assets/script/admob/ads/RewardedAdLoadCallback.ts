import { LoadAdError } from "./TypeAlias";

export interface RewardedAdLoadCallback {
    onAdFailedToLoad?: (loadAdError: LoadAdError) => void
    onAdLoaded?: () => void
}