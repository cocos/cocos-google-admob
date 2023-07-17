import { PaidEventNTF } from "../../proto/PaidEventNTF";

/**
 * @zh
 * 任何支持 OnPaidEventListener 的广告回调
 * 调用 setOnPaidEventListener 就会支持。
 * @en
 * Paid event after the native ad has a paid listener by calling the `setOnPaidEventListener` method
 */
export interface OnPaidEventListener<T extends PaidEventNTF> {
    onPaidEvent?: (paidNTF: T) => void;
}