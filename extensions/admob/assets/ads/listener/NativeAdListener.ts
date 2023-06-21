import { AdListener } from "./AdListener";
import { OnNativeAdLoadedListener } from "./OnNativeAdLoadedListener";

export type NativeAdListener = OnNativeAdLoadedListener | AdListener;