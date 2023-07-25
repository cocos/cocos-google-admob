import { Base } from "./Base";
import { _decorator  } from "cc";
const { ccclass, property } = _decorator;

@ccclass("VersionREQ")
export class VersionREQ extends Base{    ;
    constructor(unitId:string, public engineVersion:string){
        super(unitId);
    }
}