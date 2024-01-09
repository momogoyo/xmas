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
    this.frameSize = frameSize ?? new Vector2(48, 48)
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

  // canvasContext, 이미지가 그려질 위치 x, y
  drawImage (context, x, y) {
    if (!this.resource.isLoaded) {
      return
    }

    // 이미지에서 그리고자하는 시작 좌표
    let frameCoordX = 0
    let frameCoordY = 0

    const frame = this.frameMap.get(this.frame)
    if (frame) {
      frameCoordX = frame.x
      frameCoordY = frame.y
    }

    // 캔버스에 그릴 이미지 부분에 대한 크기
    const frameSizeX = this.frameSize.x
    const frameSizeY = this.frameSize.y

    /* drawImage(
      image: 캔버스에 그릴 이미지 [Image | Canvas | Video]
      sx: 원본 이미지에서 그릴 부분의 x좌표
      sy: 원본 이미지에서 그릴 부분의 y좌표
      sWidth: 원본 이미지에서 그릴 부분의 너비
      sHeight: 원본 이미지에서 그릴 부분의 높이
      dx: 캔버스에 그릴 이미지의 x좌표
      dy: 캔버스에 그릴 이미지의 y좌표
      dWidth: 캔버스에 그릴 이미지의 너비
      dHeight: 캔버스에 그릴 이미지의 높이
    ) */
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