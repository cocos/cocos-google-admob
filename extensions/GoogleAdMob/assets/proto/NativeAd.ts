import { AdError } from "../ads/alias/TypeAlias";
import { Base } from "./Base";
import { ILoadAdError } from "./ICallbackNTF";
import { _decorator  } from "cc";
const { ccclass, property } = _decorator;

export enum NativeAdTemplateSize {
    Small = 'small',
    Medium = 'medium',
}

@ccclass("LoadNativeAdREQ")
export class LoadNativeAdREQ extends Base {    
    size: NativeAdTemplateSize = NativeAdTemplateSize.Small;
}

@ccclass("LoadNativeAdACK")
export class LoadNativeAdACK extends Base {

}

@ccclass("NativeLoadedNTF")
export class NativeLoadedNTF extends Base {

}

@ccclass("NativeAdListenerNTF")
export class NativeAdListenerNTF extends Base implements ILoadAdError {
    method?: string;
    loadAdError?: AdError;
}

@ccclass("DestroyNativeAdREQ")
export class DestroyNativeAdREQ extends Base{

}

@ccclass("DestroyNativeAdACK")
export class DestroyNativeAdACK extends Base{

}