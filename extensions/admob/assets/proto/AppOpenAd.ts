import { AdError, LoadAdError } from "../ads/alias/TypeAlias";
import { Base } from "./Base";
import { IAdError, ILoadAdError } from "./ICallbackNTF";

export class LoadAppOpenAdREQ extends Base {

}
export class LoadAppOpenAdACK extends Base {

}

export class ShowAppOpenAdREQ extends Base {

}

export class ShowAppOpenAdACK extends Base {

}

export class ShowAppOpenAdCompleteNTF extends Base {

}

export class AppOpenAdFullScreenContentCallbackNTF extends Base implements IAdError {
    method: string;
    adError: AdError;
}

export class AppOpenAdLoadCallbackNTF extends Base implements ILoadAdError {
    method: string;
    loadAdError: LoadAdError;
}

export class IsAdAvailableREQ extends Base {

}

export class IsAdAvailableACK extends Base {
    valid: boolean = false;
}
