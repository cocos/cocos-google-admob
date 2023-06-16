import { LoadAdError } from "../ads/TypeAlias";
import { Base } from "./Base";
import { ILoadAdError } from "./ICallbackNTF";

export class CreateBannerViewREQ extends Base {
}

export class CreateBannerViewACK extends Base {
}

export class LoadBannerREQ extends Base {
}
export class LoadBannerACK extends Base {
}

export class SetBannerSizeREQ extends Base {
    x: number
    y: number;
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