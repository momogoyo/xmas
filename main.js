import './style.css'
import { resource } from './src/Resource'
import { Sprite } from './src/Sprite'
import { Vector2 } from './src/Vector2'
import { GameLoop } from './src/GameLoop'
import { Control, DOWN, UP, LEFT, RIGHT } from './src/Control'

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
  frame: 1
})

const shadowSprite = new Sprite({
  resource: resource.images.shadow,
  frameSize: new Vector2(48, 48)
})

const duckPos = new Vector2(48 * 5, 48 * 6)
const control = new Control()

const draw = () => {
  skySprite.drawImage(context, 0, 0)
  groundSprite.drawImage(context, 0, 0)

  const duckOffset = new Vector2(-48, -24)
  const duckPosX = duckPos.x + duckOffset.x
  const duckPosY = duckPos.y + 1 + duckOffset.y

  shadowSprite.drawImage(context, duckPosX, duckPosY)
  duckSprite.drawImage(context, duckPosX, duckPosY)
}

const update = () => {
  const { direction } = control

  if (direction === DOWN) {
    duckPos.y += 1
    duckSprite.frame = 0
  } else if (direction === UP) {
    duckPos.y -= 1
    duckSprite.frame = 9
  } else if (direction === LEFT) {
    duckPos.x -= 1
    duckSprite.frame = 5
  } else if (direction === RIGHT) {
    duckPos.x += 1
    duckSprite.frame = 8
  }
}

const gameLoop = new GameLoop(update, draw)
gameLoop.start()
