import { Howl } from 'howler';
export type ReturnedValue = [
    Howl[],
    {
        current: () => void;
        play: () => void;
        pause: () => void;
        stop: () => void;
        skipNext: () => void;
        skipPrev: () => void;
    }
];
export declare const current: (index?: number) => Howl;
export declare const sounds: () => ReturnedValue;
export default sounds;
