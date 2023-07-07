import { InterstitialPaidEventNTF } from "../../proto/PaidEventNTF";
import { InterstitialAdLoadCallback } from "./InterstitialAdLoadCallback";
import { InterstitialFullScreenContentCallback } from "./InterstitialFullScreenContentCallback";
import { OnPaidEventListener } from "./OnPaidEventListener";

export type InterstitialAdListener = InterstitialAdLoadCallback | InterstitialFullScreenContentCallback
    | OnPaidEventListener<InterstitialPaidEventNTF>;