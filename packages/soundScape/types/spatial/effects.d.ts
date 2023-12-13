import { Howl } from 'howler';
export type ReturnedValue = [
    {
        [key: string]: Howl;
    },
    {
        current: (key?: string) => Howl;
        play: () => void;
        stop: () => void;
        setPos: ({ x, y, z }: Point) => void;
        getPos: () => Point;
    }
];
export type Point = {
    x: number;
    y: number;
    z: number;
};
export declare const current: (key?: string) => Howl;
export declare const effects: () => ReturnedValue;
export default effects;
