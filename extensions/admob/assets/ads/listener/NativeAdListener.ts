import { NativePaidEventNTF } from "../../proto/PaidEventNTF";
import { AdListener } from "./AdListener";
import { OnNativeAdLoadedListener } from "./OnNativeAdLoadedListener";
import { OnPaidEventListener } from "./OnPaidEventListener";

export type NativeAdListener = OnNativeAdLoadedListener | AdListener | OnPaidEventListener<NativePaidEventNTF>;