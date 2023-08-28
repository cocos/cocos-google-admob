import { LoadAdError } from "../alias/TypeAlias";

/**
 * @zh
 * 插页式广告的加载回调
 * @en
 * Load callback for interstitial ad
 * 
 */
export interface InterstitialAdLoadCallback{
    onAdLoaded?:()=>void;
    onAdFailedToLoad?:(loadAdError:LoadAdError)=>void;
}