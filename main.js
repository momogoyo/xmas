import './style.css'
import { createEvents } from './src/events'
import { resource } from './src/Resource'
import { Sprite } from './src/Sprite'
import { Vector2 } from './src/Vector2'
import { GameLoop } from './src/GameLoop'
import { Control, DOWN, UP, LEFT, RIGHT } from './src/Control'
import { FramePattern } from './src/FramePattern'
import { Animation } from './src/Animation'
import { gridCell, isSpaceFree } from './src/helpers/grid'
import { moveTowards } from './src/helpers/moveTowards'
import { walls } from './src/levels/level1'
import { STAND_DOWN, STAND_UP, STAND_LEFT, STAND_RIGHT, WALK_DOWN, WALK_UP, WALK_LEFT, WALK_RIGHT } from './src/objects/Duck/duckAnimation'
import { SoundScape } from './src/SoundScape'

const events = createEvents()
const canvas = document.querySelector('#xmas-canvas')
const context = canvas.getContext('2d')

const soundScape = new SoundScape(events)
soundScape.play()

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
  position: new Vector2(gridCell(7), gridCell(5)),
  animations: new Animation({
    walkDown:  new FramePattern(WALK_DOWN),
    walkUp:  new FramePattern(WALK_UP),
    walkLeft:  new FramePattern(WALK_LEFT),
    walkRight:  new FramePattern(WALK_RIGHT),
    standDown: new FramePattern(STAND_DOWN),
    standUp:  new FramePattern(STAND_UP),
    standLeft:  new FramePattern(STAND_LEFT),
    standRight:  new FramePattern(STAND_RIGHT)
  })
})

let duckFacing = DOWN

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

const update = (deltaTime) => {
  const distance = moveTowards(duckSprite, duckDestinationPosition, 2)
  const hasArrived = distance <= 1

  if (hasArrived) {
    tryMove()
  }

  duckSprite.step(deltaTime)
}

const tryMove = () => {
  if (!control.direction) {
    if (duckFacing === DOWN) duckSprite.animations.play('standDown')
    if (duckFacing === UP) duckSprite.animations.play('standUp')
    if (duckFacing === LEFT) duckSprite.animations.play('standLeft')
    if (duckFacing === RIGHT) duckSprite.animations.play('standRight')

    return
  }

  const { x, y } = duckSprite.position
  events.emit('position', { x, y })

  let nextX = duckDestinationPosition.x
  let nextY = duckDestinationPosition.y

  const GRIDSIZE = 48
  
  if (control.direction === DOWN) {
    nextY += GRIDSIZE
    duckSprite.animations.play('walkDown')
  } else if (control.direction === UP) {
    nextY -= GRIDSIZE
    duckSprite.animations.play('walkUp')
  } else if (control.direction === LEFT) {
    nextX -= GRIDSIZE
    duckSprite.animations.play('walkLeft')
  } else if (control.direction === RIGHT) {
    nextX += GRIDSIZE
    duckSprite.animations.play('walkRight')
  }

  duckFacing = control.direction ?? duckFacing

  if (isSpaceFree(walls, nextX, nextY)) {
    duckDestinationPosition.x = nextX
    duckDestinationPosition.y = nextY
  }
}

const gameLoop = new GameLoop(update, draw)
gameLoop.start()
