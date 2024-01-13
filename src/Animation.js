export class Animation {
  constructor (patterns) {
    this.patterns = patterns
    this.activeFrame = Object.keys(this.patterns)[0]
  }

  get frame () {
    return this.patterns[this.activeFrame].frame
  }

  play (frameKey, startTime = 0) {
    if (this.activeFrame === frameKey) {
      return
    }

    this.activeFrame = frameKey
    this.patterns[this.activeFrame].currentTime = startTime
  }

  step (deltaTime) {
    this.patterns[this.activeFrame].step(deltaTime)
  }
}