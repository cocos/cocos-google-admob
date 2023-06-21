import { Base } from "./Base";
import { AdError, LoadAdError } from "../ads/alias/TypeAlias";
import { IAdError, ILoadAdError } from "./ICallbackNTF";

export class LoadInterstitialAdREQ extends Base{

}

export class LoadInterstitialAdACK extends Base{

}

export class ShowInterstitialAdREQ extends Base{

}

export class ShowInterstitialAdACK extends Base{

}

export class InterstitialAdLoadCalLBackNTF extends Base implements ILoadAdError{
    method:string;
    loadAdError:LoadAdError;
}

export class InterstitialFullScreenContentCallbackNTF extends Base implements IAdError{
    method:string;
    loadAdError:AdError;
}