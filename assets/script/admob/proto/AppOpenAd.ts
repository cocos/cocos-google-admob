import { AdError, LoadAdError } from "../ads/TypeAlias";
import { Base } from "./Base";
import { IAdError, ILoadAdError } from "./ICallbackNTF";

export class LoadOpenAppAdREQ extends Base {

}
export class LoadOpenAppAdACK extends Base {

}

export class ShowOpenAppAdREQ extends Base {

}

export class ShowOpenAppAdACK extends Base {

}

export class ShowOpenAppAdCompleteNTF extends Base {

}

export class OpenAppAdFullScreenContentCallbackNTF extends Base implements IAdError {
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
