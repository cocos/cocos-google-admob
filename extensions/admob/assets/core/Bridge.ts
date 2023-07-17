import { log } from "cc";
import { NATIVE } from "cc/env";
import { native } from "cc";
import { INativeResponse } from "./INativeResponse";
import { route } from "./Route";
import { Base } from "../proto/Base";
import { VersionREQ } from "../proto/Version";
import { AdMobVersion } from "./Version";

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

        const engineVersion = `cocos-${AdMobVersion}`;
        console.log(module, "init", `report engineVersion: ${engineVersion}.`);
        this.sendToNative(VersionREQ.name, new VersionREQ('', engineVersion), null, null);
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