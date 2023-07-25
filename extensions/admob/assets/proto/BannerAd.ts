import { LoadAdError } from "../ads/alias/TypeAlias";
import { BannerAlignment } from "../misc/BannerAlignment";
import { BannerSize } from "../misc/BannerSize";
import { Base } from "./Base";
import { ILoadAdError } from "./ICallbackNTF";
import { _decorator  } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LoadBannerREQ")
export class LoadBannerREQ extends Base {
    bannerSize: BannerSize;
    method:string;
    width:number;
    maxWidth:number;
    alignments:BannerAlignment[];
}

@ccclass("LoadBannerACK")
export class LoadBannerACK extends Base {
}

@ccclass("ShowBannerREQ")
export class ShowBannerREQ extends Base {
    visible: boolean;
}

@ccclass("ShowBannerACK")
export class ShowBannerACK extends Base {
    visible: boolean;
}

@ccclass("DestroyBannerREQ")
export class DestroyBannerREQ extends Base {
}

@ccclass("DestroyBannerACK")
export class DestroyBannerACK extends Base {
}

@ccclass("BannerAdListenerNTF")
export class BannerAdListenerNTF extends Base implements ILoadAdError {
    method: string;
    loadAdError: LoadAdError;
}