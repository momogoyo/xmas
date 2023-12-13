import type { SoundScapeProps } from '@/components/SoundScape';
import type { Config } from '@/config';
declare const SoundScape: {
    connect: (config: Config) => void;
    render: (element: HTMLElement, props?: SoundScapeProps) => void;
    sounds: () => import("./spatial/sounds").ReturnedValue;
    effects: () => import("./spatial/effects").ReturnedValue;
};
export default SoundScape;
