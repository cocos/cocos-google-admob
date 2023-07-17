import { LoadAdError } from "../alias/TypeAlias";

/**
 * AdListener
 * @zh
 * 广告监听器，和原生的 AdListener 方法保持一致
 * @en
 * The ad listener, has same methods as the AdListener in the native.
 */
export interface AdListener {
    onAdClicked?: () => void;
    onAdClosed?: () => void;
    onAdFailedToLoad?: (loadError: LoadAdError) => void;
    onAdImpression?: () => void;
    onAdLoaded?: () => void;
    onAdOpened?: () => void;
    onAdSwipeGestureClicked?: () => void;
}