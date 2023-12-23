export class Sprite {
  constructor ({
    resource, // 그리고 싶은 이미지 리소스
    frameSize, // 자를 이미지 사이즈
    hFrames, // 이미지 스프라이트 수평
    vFrames, // 이미지 스프라이트 수직
    frame, // 보여줄 프레임
    scale, // 그릴 이미지 크기
    position // 그릴 위치 (top left corner...)
  }) {
    this.resource = resource
    this.frameSize = frameSize
    this.hFrames = hFrames ?? 1
    this.vFrames = vFrames ?? 1
    this.frame = frame ?? 0
    this.frameMap = new Map()
    this.scale = scale ?? 1
    this.position = position

    this.buildFrameMap()
  }

  buildFrameMap () {
    let frameCount = 0

    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(
          frameCount,
          {
            x: 0,
            y: 0,
          }
        )

        frameCount++
      }
    }
  }
}