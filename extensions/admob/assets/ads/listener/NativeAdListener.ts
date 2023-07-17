import { NativePaidEventNTF } from "../../proto/PaidEventNTF";
import { AdListener } from "./AdListener";
import { OnNativeAdLoadedListener } from "./OnNativeAdLoadedListener";
import { OnPaidEventListener } from "./OnPaidEventListener";

/**
 * @zh
 * 原生广告事件的监听
 * @en
 * The union of all native listener
 */
export type NativeAdListener = OnNativeAdLoadedListener | AdListener | OnPaidEventListener<NativePaidEventNTF>;