import { LoadAdError } from "./TypeAlias";

/**
 * Banner Listener
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