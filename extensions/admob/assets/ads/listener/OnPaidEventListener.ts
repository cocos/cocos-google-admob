import { PaidEventNTF } from "../../proto/PaidEventNTF";

export interface OnPaidEventListener<T extends PaidEventNTF> {
    onPaidEvent?: (paidNTF: T) => void;
}