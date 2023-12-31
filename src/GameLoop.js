export class GameLoop {
  constructor (update, render) {
    this.lastFrameTime = 0 // 프레임 끝 시간
    this.accumulatedTime = 0 // 누적된 시간
    this.timeStamp = 1000 / 60 // 초당 60 프레임으로 설정
    
    this.update = update
    this.render = render

    this.rafId = null
    this.isRunning = false
  }

  mainLoop (timeStamp) {
    if (!this.isRunning) {
      return
    }

    const deltaTime = timeStamp - this.lastFrameTime // 현재 프레임과 이전 프레임의 시간 차: 마지막 프레임 이후 얼마나 지나갔는지
    this.lastFrameTime = timeStamp // 프레임 업데이트 주기를 위해 마지막 프레임 시간을 업데이트
    
    this.accumulatedTime += deltaTime

    while (this.accumulatedTime >= this.timeStamp) {
      this.update(this.timeStamp)
      this.accumulatedTime -= this.timeStamp
    }

    this.render()

    this.rafId = requestAnimationFrame(this.mainLoop.bind(this))
  }

  start () {
    if (!this.isRunning) {
      this.isRunning = true
      this.rafId = requestAnimationFrame(this.mainLoop.bind(this))
    }
  }

  stop () {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
    }

    this.isRunning = false
  }
}