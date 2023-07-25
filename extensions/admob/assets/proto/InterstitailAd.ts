import { Base } from "./Base";
import { AdError, LoadAdError } from "../ads/alias/TypeAlias";
import { IAdError, ILoadAdError } from "./ICallbackNTF";
import { _decorator  } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LoadInterstitialAdREQ")
export class LoadInterstitialAdREQ extends Base{

}

@ccclass("LoadInterstitialAdACK")
export class LoadInterstitialAdACK extends Base{

}

@ccclass("ShowInterstitialAdREQ")
export class ShowInterstitialAdREQ extends Base{

}

@ccclass("ShowInterstitialAdACK")
export class ShowInterstitialAdACK extends Base{

}

@ccclass("InterstitialAdLoadCalLBackNTF")
export class InterstitialAdLoadCalLBackNTF extends Base implements ILoadAdError{
    method:string;
    loadAdError:LoadAdError;
}

@ccclass("InterstitialFullScreenContentCallbackNTF")
export class InterstitialFullScreenContentCallbackNTF extends Base implements IAdError{
    method:string;
    loadAdError:AdError;
}