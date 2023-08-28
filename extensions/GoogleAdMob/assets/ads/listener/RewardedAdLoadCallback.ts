import { LoadAdError } from "../alias/TypeAlias"

/**
 * @zh
 * 激励广告的加载回调
 * @en
 * Listener for rewarded ad.
 */
export interface RewardedAdLoadCallback {
    onAdFailedToLoad?: (loadAdError: LoadAdError) => void
    onAdLoaded?: () => void
}