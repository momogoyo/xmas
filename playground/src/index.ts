import SoundScape from '@momogoyo/sound-scape'

const host = '/public/samples'

SoundScape.connect({
  sounds: [
    {
      key: 'jazzy_10',
      src: `${host}/sounds/jazzy/jazzy_10.mp3`
    },
    {
      key: 'jazzy_11',
      src: `${host}/sounds/jazzy/jazzy_11.mp3`
    },
    {
      key: 'jazzy_12',
      src: `${host}/sounds/jazzy/jazzy_12.mp3`
    },
    {
      key: 'jazzy_13',
      src: `${host}/sounds/jazzy/jazzy_13.mp3`
    },
    {
      key: 'jazzy_15',
      src: `${host}/sounds/jazzy/jazzy_15.mp3`
    },
    {
      key: 'jazzy_4',
      src: `${host}/sounds/jazzy/jazzy_4.mp3`
    },
    {
      key: 'jazzy_5',
      src: `${host}/sounds/jazzy/jazzy_5.mp3`
    },
    {
      key: 'jazzy_6',
      src: `${host}/sounds/jazzy/jazzy_6.mp3`
    }
  ],
  effects: [
    {
      key: 'birds',
      src: `${host}/effects/birds.mp3`
    },
    {
      key: 'wind',
      src: `${host}/effects/wind.mp3`
    },
    {
      key: 'campfire',
      src: `${host}/effects/campfire.mp3`
    },
    {
      key: 'ocean',
      src: `${host}/effects/ocean.mp3`
    },
    {
      key: 'keyboard',
      src: `${host}/effects/keyboard.mp3`
    },
    {
      key: 'rain',
      src: `${host}/effects/rain.mp3`
    },
    {
      key: 'thunders',
      src: `${host}/effects/thunders.mp3`
    },

  ]
})

SoundScape.render(document.getElementById('soundScape') as HTMLElement, {
  onClose: () => {
    console.log('close')
  }
})

// const [sounds, { play, pause, skipNext, current }] = SoundScape.musics()

// document.body.onclick = () => {
//   play()
// }

// setInterval(() => {
//   skipNext()
// }, 2000)


// const { rain, fire } = SoundScape.nosises()


// rain.play()
// fire.play()