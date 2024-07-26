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
import { log } from "cc";
import { NATIVE } from "cc/env";
import { native } from "cc";
import { INativeResponse } from "./INativeResponse";
import { route } from "./Route";
import { Base } from "../proto/Base";
import { VersionREQ } from "../proto/Version";
import { ExtensionVersion } from "./Version";
import { js } from "cc";

/**
 * @zh
 * 桥接原生和 TS 
 * @en
 * Bridge connect native to ts
 */
const module = "[Bridge]";
export class Bridge {

    init(): Bridge {
        log(module, "init");
        this.overwriteCallback();

        const engineVersion = `cocos-${ExtensionVersion}`;
        console.log(module, "init", `report engineVersion: ${engineVersion}.`);
        this.sendToNative(js.getClassName(VersionREQ), new VersionREQ('', engineVersion), null, null);
        return this;
    }

    destroy() {
        log(module, "destroy");
    }

    overwriteCallback() {
        log(module, "overwriteCallback");

        if (NATIVE) {
            native.bridge.onNative = this.onNative;
        }
    }

    onNative = (arg0: string, arg1: string) => {
        log(module, `onNative method: ${arg0} | content: ${arg1}`,);
        //te.instance.dispatch(arg0, Route.instance.codec.decode(arg1));            
        const ack = route.codec.decode<Base>(arg1)
        route.dispatch(arg0, ack);
    }

    sendToNative<TProto extends Base>(arg0: string, req: TProto, responseMethod?: string, onResponse?: INativeResponse, thisArg?: any) {
        log(module, "sendToNative", `method = ${arg0}, req.unitId = ${req.unitId}`);

        if (onResponse) {
            route.once(responseMethod, onResponse, thisArg);
        }

        if (NATIVE) {
            native.bridge.sendToNative(arg0, route.codec.encode(req));
        }
    }

}

export const bridge = new Bridge().init();