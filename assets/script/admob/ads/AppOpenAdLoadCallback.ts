import { LoadAdError } from "./TypeAlias";

export interface AppOpenAdLoadCallback{
    onAdLoaded?:(unitId:string)=>void;
    onAdFailedToLoad?:(loadAdError:LoadAdError)=>void;
}
