import type { Howl } from 'howler'

export const sounds: Howl[] = []
export const effects: {
  [key: string]: Howl
} = {}

export default {
  sounds,
  effects
}