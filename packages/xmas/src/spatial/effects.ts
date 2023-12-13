import { Howl } from 'howler'
import { config } from '@/config'
import { effects as context } from '@/context'
import { once } from '@momogoyo/sound-scape-shared'
import { Events } from '@/constants'

export type ReturnedValue = [{
    [key: string]: Howl
  }, {
    current: (key?: string) => Howl
    play: () => void
    stop: () => void
    setPos: ({ x, y, z }: Point) => void
    getPos: () => Point
  }
]

export type Point = {
  x: number
  y: number
  z: number
}

let currentId = 0
let currentKey = ''

export const current = (
  key?: string
): Howl => {
  currentKey = key

  return context[currentKey]
}

const play = (): void => {
  const sound = current(currentKey)
  if (!sound.playing()) {
    currentId = sound.play()
  }
}

const stop = (): void => {
  const sound = current(currentKey)

  sound.fade(1, 0, 1000, currentId)
  sound.once(Events.FADE, () => {
    sound.stop()
  })
}

const setPos = ({
  x, y, z
}: Point) => {
  const sound = current(currentKey)

  if (sound) {
    sound.pos(x, y, z, currentId)
  }
}

const getPos = (): Point => {
  const sound = current(currentKey)

  if (sound) {
    const pos = sound.pos()
    
    const x = pos[0]
    const y = pos[1]
    const z = pos[2]

    return {
      x, y, z
    }
  }
}

const initialize = once(() => {
  const tracks = config.effects
  tracks.forEach((track) => {
    const effect = new Howl({
      src: [track.src],
      html5: false,
      loop: true
    })

    effect.pannerAttr({
      panningModel: 'HRTF',
      distanceModel: 'linear',
      maxDistance: 1000,
      coneInnerAngle: 360,
      coneOuterAngle: 360,
      coneOuterGain: 0,
      refDistance: 1,
      rolloffFactor: 1
    })

    effect.pannerAttr(effect.pannerAttr())
    // effect.pos(0, 0, 0)

    context[track.key] = effect
  })
})

export const effects = (): ReturnedValue => {
  initialize()

  return [context, {
    current,
    play,
    stop,
    setPos,
    getPos
  }]
}

export default effects