import { InterstitialPaidEventNTF } from "../../proto/PaidEventNTF";
import { InterstitialAdLoadCallback } from "./InterstitialAdLoadCallback";
import { InterstitialFullScreenContentCallback } from "./InterstitialFullScreenContentCallback";
import { OnPaidEventListener } from "./OnPaidEventListener";

/**
 * @zh
 * 插页式广告回调的联合类型
 * @en
 * Union for the interstitial ad.
 */
export type InterstitialAdListener = InterstitialAdLoadCallback | InterstitialFullScreenContentCallback
    | OnPaidEventListener<InterstitialPaidEventNTF>;