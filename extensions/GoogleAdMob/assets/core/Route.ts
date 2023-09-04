/*
 Copyright (c) 2023-2024 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 of the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/
import { Base } from "../proto/Base";
import { Codec, ICodec } from "./Codec";
import { INativeResponse } from "./INativeResponse";
import { EventTarget } from "cc";
import { log } from "cc";

/**
 * @zh
 * 封装 EventTarget，用于事件派发
 * @en
 * Encapsulate an event target to dispatch events from native.
 */
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