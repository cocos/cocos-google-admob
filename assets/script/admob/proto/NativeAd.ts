import { AdError } from "../ads/alias/TypeAlias";
import { Base } from "./Base";
import { IAdError } from "./ICallbackNTF";

export class LoadNativeAdREQ extends Base {
    adCount: number;
}

export class LoadNativeAdACK extends Base{

}

export class NativeLoadNTF extends Base {

}

export class NativeAdLoadNTF extends Base implements IAdError {
    method?:string;
    adError?:AdError;
}