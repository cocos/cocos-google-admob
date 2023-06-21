import { AdError } from "../ads/alias/TypeAlias";
import { Base } from "./Base";
import { ILoadAdError } from "./ICallbackNTF";

export enum NativeAdTemplateSize {
    Small = 'small',
    Medium = 'medium',
}

export class LoadNativeAdREQ extends Base {    
    size: NativeAdTemplateSize = NativeAdTemplateSize.Small;
}

export class LoadNativeAdACK extends Base {

}

export class NativeLoadedNTF extends Base {

}

export class NativeAdListenerNTF extends Base implements ILoadAdError {
    method?: string;
    loadAdError?: AdError;
}

export class DestroyNativeAdREQ extends Base{

}

export class DestroyNativeAdACK extends Base{

}