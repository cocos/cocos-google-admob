import { AdError } from "../alias/TypeAlias"

/**
 * @zh
 * 转发原生 FullScreenContentCallback
 * @en
 * Transmit methods in the native FullScreenContentCallback
 */
export interface FullScreenContentCallback{
    onAdClicked?:()=>void
    onAdDismissedFullScreenContent?:()=>void
    onAdFailedToShowFullScreenContent?:(adError:AdError)=>void
    onAdImpression?:()=>void
    onAdShowedFullScreenContent?:()=>void
}