import { LoadAdError } from "../alias/TypeAlias";

export interface InterstitialAdLoadCallback{
    onAdLoaded?:()=>void;
    onAdFailedToLoad?:(loadAdError:LoadAdError)=>void;
}