import { Base } from "./Base";

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

export class BannerPaidEventNTF extends PaidEventNTF {}
export class InterstitialPaidEventNTF extends PaidEventNTF {}
export class NativePaidEventNTF extends PaidEventNTF {}
export class AppOpenPaidEventNTF extends PaidEventNTF {}
export class RewardedPaidEventNTF extends PaidEventNTF {}
export class RewardedInterstitialPaidEventNTF extends PaidEventNTF {}