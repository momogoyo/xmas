export type Sounds = {
    key: string;
    src: string;
    html5?: boolean;
};
export type Effects = {
    key: string;
    src: string;
    html5?: boolean;
};
export type Config = {
    sounds?: Sounds[];
    effects?: Effects[];
};
export declare const config: Config;
