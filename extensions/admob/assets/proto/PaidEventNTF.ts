import { Base } from "./Base";
import { _decorator  } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PaidEventNTF")
export class PaidEventNTF extends Base {

    valueMicros: number;
    currencyCode: string;
    precision: number;

    adSourceName: string;
    adSourceId: string;
    adSourceInstanceName: string;
    adSourceInstanceId: string;

    mediationGroupName: string;
    mediationABTestName: string;
    mediationABTestVariant: string;
}

@ccclass("BannerPaidEventNTF")
export class BannerPaidEventNTF extends PaidEventNTF {}
@ccclass("InterstitialPaidEventNTF")
export class InterstitialPaidEventNTF extends PaidEventNTF {}
@ccclass("NativePaidEventNTF")
export class NativePaidEventNTF extends PaidEventNTF {}
@ccclass("AppOpenPaidEventNTF")
export class AppOpenPaidEventNTF extends PaidEventNTF {}
@ccclass("RewardedPaidEventNTF")
export class RewardedPaidEventNTF extends PaidEventNTF {}
@ccclass("RewardedInterstitialPaidEventNTF")
export class RewardedInterstitialPaidEventNTF extends PaidEventNTF {}