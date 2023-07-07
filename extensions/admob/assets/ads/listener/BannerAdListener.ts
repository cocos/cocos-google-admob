import { BannerPaidEventNTF } from "../../proto/PaidEventNTF";
import { AdListener } from "./AdListener";
import { OnPaidEventListener } from "./OnPaidEventListener";

export type BannerAdListener = AdListener | OnPaidEventListener<BannerPaidEventNTF>; 