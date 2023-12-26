import { Vector2 } from './Vector2'

export class Sprite {
  constructor ({
    resource, // 그리고 싶은 이미지 리소스
    frameSize, // 자를 이미지 사이즈 {x, y}
    hFrames, // 이미지 스프라이트 수평
    vFrames, // 이미지 스프라이트 수직
    frame, // 보여줄 프레임
    scale, // 그릴 이미지 크기
    position // 그릴 위치 (top left corner...)
  }) {
    this.resource = resource
    this.frameSize = frameSize ?? new Vector2(32, 32)
    this.hFrames = hFrames ?? 1
    this.vFrames = vFrames ?? 1
    this.frame = frame ?? 0
    this.frameMap = new Map()
    this.scale = scale ?? 1
    this.position = position ?? new Vector2(0, 0)

    this.buildFrameMap()
  }

  buildFrameMap () {
    let frameCount = 0

    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(
          frameCount,
          new Vector2(this.frameSize.x * h, this.frameSize.y * v)
        )

        frameCount++
      }
    }
  }

  drawImage (context, x, y) {
    if (!this.resource.isLoaded) {
      return
    }

    let frameCoordX = 0
    let frameCoordY = 0

    const frame = this.frameMap.get(this.frame)
    if (frame) {
      frameCoordX = frame.x
      frameCoordY = frame.y
    }

    const frameSizeX = this.frameSize.x
    const frameSizeY = this.frameSize.y

    context.drawImage(
      this.resource.image,
      frameCoordX,
      frameCoordY,
      frameSizeX,
      frameSizeY,
      x,
      y,
      frameSizeX * this.scale,
      frameSizeY * this.scale,
    )
  }
}