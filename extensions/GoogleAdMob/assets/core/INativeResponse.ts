import { Base } from "../proto/Base";

/**
 * @zh
 * 原生回调
 * @en
 * interface for native response
 */
export interface INativeResponse {
    (arg:Base):void;
}