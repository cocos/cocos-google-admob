import { AppOpenPaidEventNTF } from "../../proto/PaidEventNTF";
import { AppOpenAdLoadCallback } from "./AppOpenAdLoadCallback";
import { OnPaidEventListener } from "./OnPaidEventListener";
import { OnShowAdCompleteListener } from "./OnShowAdCompleteListener";
import { AppOpenAdFullScreenContentCallback } from "./AppOpenAdFullScreenContentCallback";

export type AppOpenAdListener = AppOpenAdLoadCallback | AppOpenAdFullScreenContentCallback
    | OnPaidEventListener<AppOpenPaidEventNTF>
    | OnShowAdCompleteListener;