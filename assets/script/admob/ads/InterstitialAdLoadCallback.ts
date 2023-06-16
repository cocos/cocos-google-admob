import { LoadAdError } from "./TypeAlias";

export interface InterstitialAdLoadCallback{
    onAdLoaded?:()=>void;
    onAdFailedToLoad?:(loadAdError:LoadAdError)=>void;
}