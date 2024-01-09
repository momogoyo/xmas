import './style.css'
import { resource } from './src/Resource'
import { Sprite } from './src/Sprite'
import { Vector2 } from './src/Vector2'
import { GameLoop } from './src/GameLoop'
import { Control, DOWN, UP, LEFT, RIGHT } from './src/Control'
import { gridCell, isSpaceFree } from './src/helpers/grid'
import { moveTowards } from './src/helpers/moveTowards'
import { walls } from './src/levels/level1'

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
  frame: 1,
  position: new Vector2(gridCell(7), gridCell(5))
})

const shadowSprite = new Sprite({
  resource: resource.images.shadow,
  frameSize: new Vector2(48, 48)
})

const control = new Control()
const duckDestinationPosition = duckSprite.position.duplicate()

const draw = () => {
  skySprite.drawImage(context, 0, 0)
  groundSprite.drawImage(context, 0, 0)

  const duckOffset = new Vector2(-48, -24)
  const duckPosX = duckSprite.position.x + duckOffset.x
  const duckPosY = duckSprite.position.y + 1 + duckOffset.y

  shadowSprite.drawImage(context, duckPosX, duckPosY)
  duckSprite.drawImage(context, duckPosX, duckPosY)
}

const update = () => {
  const distance = moveTowards(duckSprite, duckDestinationPosition, 2)
  const hasArrived = distance <= 1

  if (hasArrived) {
    tryMove()
  }
}

const tryMove = () => {
  if (!control.direction) {
    return
  }

  let nextX = duckDestinationPosition.x
  let nextY = duckDestinationPosition.y
  const GRIDSIZE = 48
  
  if (control.direction === DOWN) {
    nextY += GRIDSIZE
    duckSprite.frame = 0
  } else if (control.direction === UP) {
    nextY -= GRIDSIZE
    duckSprite.frame = 9
  } else if (control.direction === LEFT) {
    nextX -= GRIDSIZE
    duckSprite.frame = 5
  } else if (control.direction === RIGHT) {
    nextX += GRIDSIZE
    duckSprite.frame = 8
  }

  if (isSpaceFree(walls, nextX, nextY)) {
    duckDestinationPosition.x = nextX
    duckDestinationPosition.y = nextY
  }
}

const gameLoop = new GameLoop(update, draw)
gameLoop.start()
