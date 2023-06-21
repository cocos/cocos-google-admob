import { Base } from "./Base";

export class VersionREQ extends Base{    ;
    constructor(unitId:string, public engineVersion:string){
        super(unitId);
    }
}