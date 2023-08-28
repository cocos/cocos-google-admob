/**
 * @zh
 * 协议解析的接口
 * @en
 * Interface to parse protocols.
 */
export interface ICodec{
    decode<T>(content:string) : T
    encode<T>(t:T):string
}

/**
 * @zh
 * 协议解析器
 * @en
 * codec to parse JSON
 */
export class Codec implements ICodec{

    decode<T>(content:string) : T{
        return JSON.parse(content) as T;
    }
    
    encode<T>(t:T):string{
        return JSON.stringify(t);
    }
}
