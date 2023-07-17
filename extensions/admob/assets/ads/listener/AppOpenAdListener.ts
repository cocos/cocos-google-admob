import { AppOpenPaidEventNTF } from "../../proto/PaidEventNTF";
import { AppOpenAdLoadCallback } from "./AppOpenAdLoadCallback";
import { OnPaidEventListener } from "./OnPaidEventListener";
import { OnShowAdCompleteListener } from "./OnShowAdCompleteListener";
import { AppOpenAdFullScreenContentCallback } from "./AppOpenAdFullScreenContentCallback";

/**
 * @zh
 * 开屏广告的监听器的联合类型
 * @en
 * Union of listeners for App Open Ad.
 */
export type AppOpenAdListener = AppOpenAdLoadCallback | AppOpenAdFullScreenContentCallback
    | OnPaidEventListener<AppOpenPaidEventNTF>
    | OnShowAdCompleteListener;