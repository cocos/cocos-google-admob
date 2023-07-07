import { LoadAdError } from "../alias/TypeAlias";

export class RewardedInterstitialAdLoadCallback {
    onAdLoaded?: (unitId: string) => void;
    onAdFailedToLoad?: (loadAdError: LoadAdError) => void;
}