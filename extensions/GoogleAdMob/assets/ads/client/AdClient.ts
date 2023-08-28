import { EventTarget } from "cc";

/**
 * AdClient
 * @zh
 * 所有广告类型的基类
 * @en
 * Base class for all ads.
 */
export abstract class AdClient extends EventTarget {

    /**
     * @zh
     * 广告单元 Id
     * @en
     * The unit Id 
     */
    unitId: string;
}