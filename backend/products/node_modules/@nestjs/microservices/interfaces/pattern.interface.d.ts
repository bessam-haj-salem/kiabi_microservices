export declare type MsFundamentalPattern = string | number;
export interface MsObjectPattern {
    [key: string]: MsFundamentalPattern | MsObjectPattern;
}
export declare type MsPattern = MsObjectPattern | MsFundamentalPattern;
