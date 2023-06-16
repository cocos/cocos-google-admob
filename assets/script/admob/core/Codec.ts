export interface ICodec{
    decode<T>(content:string) : T
    encode<T>(t:T):string
}

export class Codec implements ICodec{

    decode<T>(content:string) : T{
        return JSON.parse(content) as T;
    }
    
    encode<T>(t:T):string{
        return JSON.stringify(t);
    }
}
