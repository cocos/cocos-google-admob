import { LoadAdError } from "../alias/TypeAlias"

export interface RewardedAdLoadCallback {
    onAdFailedToLoad?: (loadAdError: LoadAdError) => void
    onAdLoaded?: () => void
}