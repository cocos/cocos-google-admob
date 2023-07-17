import { LoadAdError } from "../alias/TypeAlias";

/**
 * @zh
 * 插页式激励广告的加载回调
 * @en
 * Listener for Rewarded interstitial ad
 */
export class RewardedInterstitialAdLoadCallback {
    onAdLoaded?: (unitId: string) => void;
    onAdFailedToLoad?: (loadAdError: LoadAdError) => void;
}