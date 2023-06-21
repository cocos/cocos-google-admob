import { EventTarget } from "cc";

export abstract class AdClient extends EventTarget {
    unitId: string;
}