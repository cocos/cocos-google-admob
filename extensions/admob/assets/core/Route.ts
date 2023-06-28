import { Base } from "../proto/Base";
import { Codec, ICodec } from "./Codec";
import { INativeResponse } from "./INativeResponse";
import { EventTarget } from "cc";
import { log } from "cc";

const module = "[Route]"
export class Route {

    codec: ICodec;

    private _eventTarget: EventTarget = new EventTarget();

    init(codec: ICodec): Route {
        log(module, "init");
        this.codec = codec;
        return this;
    }

    destroy() { }

    once(method: string, handler: INativeResponse, thisArg: any) {
        log(module, "once", method);
        this._eventTarget.once(method, handler, thisArg);
    }

    off(method: string, response: INativeResponse, thisArg: any) {
        log(module, "off", method);
        this._eventTarget.off(method, response, thisArg);
    }

    on(method: string, handler: INativeResponse, thisArg: any) {
        log(module, "on", method);
        this._eventTarget.on(method, handler, thisArg);
    }

    dispatch(method: string, ack?: Base) {    
        log(module, "dispatch", method);    
        this._eventTarget.emit(method, ack);
    }
}

export const route = new Route().init(new Codec);