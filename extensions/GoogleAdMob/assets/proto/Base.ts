import { _decorator  } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Base")
export class Base {    
    constructor(public unitId: string){}
}