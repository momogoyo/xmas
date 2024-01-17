export class SoundScape {
  constructor (events) {
    this.events = events

    this.play()
    this.addEventListeners()
  }

  play () {
    console.log('sound scape 기본적으로 재생')
  }

  addEventListeners() {
    this.events.on('position', ({ x, y }) => {
      console.log(x, y)
    })
  }
}