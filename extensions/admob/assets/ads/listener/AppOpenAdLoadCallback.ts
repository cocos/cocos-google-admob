import { LoadAdError } from "../alias/TypeAlias";

/**
 * AppOpenAdLoadCallback
 * @zh
 * 加载开屏广告的监听回调
 * @en
 * Callback to load App Open Ad.
 */
export interface AppOpenAdLoadCallback{
    onAdLoaded?:(unitId:string)=>void;
    onAdFailedToLoad?:(loadAdError:LoadAdError)=>void;
}
