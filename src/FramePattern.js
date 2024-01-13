// 누적된 현재 시점을 기준으로 보여줄 프레임을 반환한다.
export class FramePattern {
  constructor (animationConfigs) {
    this.currentTime = 0
    this.animationConfigs = animationConfigs
    this.duration = animationConfigs.duration ?? 500
  }

  get frame () {
    const { frames } = this.animationConfigs

    for (let i = frames.length - 1; i >= 0; i--) {
      const { frame, time } = frames[i]
      
      if (this.currentTime >= time) {
        return frame
      }
    }

    throw `No frame found for time ${this.currentTime} in animation ${this.animationConfigs}`
  }

  step (deltaTime) {
    this.currentTime += deltaTime

    if (this.currentTime >= this.duration) {
      this.currentTime = 0
    }
  }
}