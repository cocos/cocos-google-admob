import { BannerPaidEventNTF } from "../../proto/PaidEventNTF";
import { AdListener } from "./AdListener";
import { OnPaidEventListener } from "./OnPaidEventListener";

/**
 * @zh
 * 横幅广告的监听器联合类型
 * @en
 * Union of all banner listeners
 */
export type BannerAdListener = AdListener | OnPaidEventListener<BannerPaidEventNTF>; 