import './style.css'
import { resource } from './src/Resource'
import { Sprite } from './src/Sprite'
import { Vector2 } from './src/Vector2'

const canvas = document.querySelector('#xmas-canvas')
const context = canvas.getContext('2d')

const skySprite = new Sprite({
  resource: resource.images.sky,
  frameSize: new Vector2(640, 360)
})

const groundSprite = new Sprite({
  resource: resource.images.ground,
  frameSize: new Vector2(640, 360)
})

const duckSprite = new Sprite({
  resource: resource.images.metheduck,
  frameSize: new Vector2(64, 64),
  hFrames: 1,
  vFrames: 12,
  frame: 1
})

const draw = () => {
  skySprite.drawImage(context, 0, 0)
  groundSprite.drawImage(context, 0, 0)
}

setInterval(() => {
  draw()
}, 300)
