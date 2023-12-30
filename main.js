import './style.css'
import { resource } from './src/Resource'
import { Sprite } from './src/Sprite'
import { Vector2 } from './src/Vector2'

const canvas = document.querySelector('#xmas-canvas')
const context = canvas.getContext('2d')

const skySprite = new Sprite({
  resource: resource.images.sky,
  frameSize: new Vector2(960, 540)
})

const groundSprite = new Sprite({
  resource: resource.images.ground,
  frameSize: new Vector2(960, 540)
})

const duckSprite = new Sprite({
  resource: resource.images.metheduck,
  frameSize: new Vector2(48, 48),
  hFrames: 12,
  vFrames: 1,
  frame: 5
})

const shadowSprite = new Sprite({
  resource: resource.images.shadow,
  frameSize: new Vector2(48, 48)
})

const duckPos = new Vector2(48 * 5, 48 * 6)

const draw = () => {
  skySprite.drawImage(context, 0, 0)
  groundSprite.drawImage(context, 0, 0)

  const duckOffset = new Vector2(-48, -24)
  const duckPosX = duckPos.x + duckOffset.x
  const duckPosY = duckPos.y + 1 + duckOffset.y

  shadowSprite.drawImage(context, duckPosX, duckPosY)
  duckSprite.drawImage(context, duckPosX, duckPosY)
}

setInterval(() => {
  duckSprite.frame = (duckSprite.frame + 1) % 12
  draw()
}, 300)
