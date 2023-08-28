import { _decorator } from "cc";
import { AdError, LoadAdError } from "../ads/alias/TypeAlias";
import { Base } from "./Base";
import { IAdError, ILoadAdError } from "./ICallbackNTF";
const { ccclass, property } = _decorator;

@ccclass("LoadAppOpenAdREQ")
export class LoadAppOpenAdREQ extends Base {

}

@ccclass("LoadAppOpenAdACK")
export class LoadAppOpenAdACK extends Base {

}

@ccclass("ShowAppOpenAdREQ")
export class ShowAppOpenAdREQ extends Base {

}

@ccclass("ShowAppOpenAdACK")
export class ShowAppOpenAdACK extends Base {

}

@ccclass("ShowAppOpenAdCompleteNTF")
export class ShowAppOpenAdCompleteNTF extends Base {

}

@ccclass("AppOpenAdFullScreenContentCallbackNTF")
export class AppOpenAdFullScreenContentCallbackNTF extends Base implements IAdError {
    method: string;
    adError: AdError;
}

@ccclass("AppOpenAdLoadCallbackNTF")
export class AppOpenAdLoadCallbackNTF extends Base implements ILoadAdError {
    method: string;
    loadAdError: LoadAdError;
}

@ccclass("IsAdAvailableREQ")
export class IsAdAvailableREQ extends Base {

}

@ccclass("IsAdAvailableACK")
export class IsAdAvailableACK extends Base {
    valid: boolean = false;
}
