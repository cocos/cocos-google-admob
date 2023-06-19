import { AdError, LoadAdError } from "../ads/alias/TypeAlias";

export interface ILoadAdError{
    method?:string;
    loadAdError?:LoadAdError;
}

export interface IAdError{
    method?:string;
    adError?:AdError;
}