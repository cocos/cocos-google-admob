import { AdError } from "../alias/TypeAlias"

export interface FullScreenContentCallback{
    onAdClicked?:()=>void
    onAdDismissedFullScreenContent?:()=>void
    onAdFailedToShowFullScreenContent?:(adError:AdError)=>void
    onAdImpression?:()=>void
    onAdShowedFullScreenContent?:()=>void
}