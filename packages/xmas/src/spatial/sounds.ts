import { Howl } from 'howler'
import { config } from '@/config'
import { sounds as context } from '@/context'
import { once } from '@momogoyo/xmas-shared'
import { Events } from '@/constants'

export type ReturnedValue = [
  Howl[],
  {
    current: () => void
    play: () => void
    pause: () => void
    stop: () => void
    skipNext: () => void
    skipPrev: () => void
  }
]

let currentId = 0
let currentIndex = 0

export const current = (
  index?: number
): Howl => {
  if (isNaN(index)) {
    index = currentIndex
  }

  return context[index]
}

const play = (): void => {
  const sound = current()
  if (!sound.playing()) {
    currentId = sound.play()
  }
}

const pause = (): void => {
  const sound = current()
  if (sound.playing()) {
    sound.pause()
  }
}

const stop = (): void => {
  const sound = current()
  sound.stop()
}

const skipNext = () => {
  const currIndex = currentIndex
  const nextIndex = currIndex < context.length - 1 ? currentIndex + 1 : 0

  if (nextIndex !== currIndex) {
    const currSound = current()
    const nextSound = current(nextIndex)

    if (currSound.playing()) {
      currSound.fade(1, 0, 1000, currentId)
      currSound.once(Events.FADE, () => {
        currSound.stop()
        currentId = nextSound.play()
      })
    }

    currentIndex = nextIndex
  }
}

const skipPrev = () => {
  const currIndex = currentIndex
  const prevIndex = currIndex > 0 ? currIndex - 1 : context.length - 1
  
  if (prevIndex !== currIndex) {
    const currSound = current()
    const prevSound = current(prevIndex)
    
    if (currSound.playing()) {
      currSound.fade(1, 0, 1000, currentId)
      currSound.once(Events.FADE, () => {
        currSound.stop()
        currentId = prevSound.play()
      })
    }

    currentIndex = prevIndex
  }
}

const initialize = once(() => {
  const tracks = config.sounds
  tracks.forEach((track) => {
    const sound = new Howl({
      src: [track.src],
      html5: false,
      loop: true,
      volume: 0.5
    })

    context.push(sound)
  })
})

export const sounds = (): ReturnedValue => {
  initialize()

  return [context, {
    current,
    play,
    pause,
    stop,
    skipNext,
    skipPrev
  }]
}

export default sounds