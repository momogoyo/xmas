import { h, render as prender } from 'preact'
import { config as defaultConfig } from '@/config'
import { assign } from '@momogoyo/sound-scape-shared'
import { sounds, effects } from '@/spatial'
import Component from '@/components/SoundScape'

import type { SoundScapeProps } from '@/components/SoundScape'
import type { Config } from '@/config'

const connect = (
  config: Config
) => {
  assign(defaultConfig, config)
}

const render = (
  element: HTMLElement,
  props?: SoundScapeProps
) => {
  prender(h(Component, props), element)
}

const SoundScape = {
  connect,
  render,
  sounds,
  effects
}

export default SoundScape