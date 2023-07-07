import { LoadAdError } from "../ads/alias/TypeAlias";
import { BannerAlignment } from "../misc/BannerAlignment";
import { BannerSize } from "../misc/BannerSize";
import { Base } from "./Base";
import { ILoadAdError } from "./ICallbackNTF";

export class LoadBannerREQ extends Base {
    bannerSize: BannerSize;
    method:string;
    width:number;
    maxWidth:number;
    alignments:BannerAlignment[];
}
export class LoadBannerACK extends Base {
}

export class ShowBannerREQ extends Base {
    visible: boolean;
}

export class ShowBannerACK extends Base {
    visible: boolean;
}

export class DestroyBannerREQ extends Base {
}

export class DestroyBannerACK extends Base {
}

export class BannerAdListenerNTF extends Base implements ILoadAdError {
    method: string;
    loadAdError: LoadAdError;
}