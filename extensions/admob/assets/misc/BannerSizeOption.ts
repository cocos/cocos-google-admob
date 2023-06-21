import { BannerAlignment, BottomCenter } from "./BannerAlignment";
import { BannerSize } from "./BannerSize";

/**
 * @en
 * 
 */
export class BannerSizeOption {
    size: BannerSize = BannerSize.BANNER
    alignments?: BannerAlignment[] = BottomCenter;
}