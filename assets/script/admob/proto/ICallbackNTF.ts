import { AdError, LoadAdError } from "../ads/TypeAlias";

export interface ILoadAdError{
    method?:string;
    loadAdError?:LoadAdError;
}

export interface IAdError{
    method?:string;
    adError?:AdError;
}