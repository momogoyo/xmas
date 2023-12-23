import './style.css'
import { resource } from './src/Resource'
import { Sprite } from './src/Sprite'

const canvas = document.querySelector('#xmas-canvas')
const context = canvas.getContext('2d')

const draw = () => {
  const sky = resource.images.sky

  if (sky.isLoaded) {
    context.drawImage(sky.image, 0, 0)
  }

  const ground = resource.images.ground

  if (ground.isLoaded) {
    context.drawImage(ground.image, 0, 0)
  }
}

const sprite = new Sprite({
  reousrce: resource.images.metheduck,
  vFrames: 1,
  hFrames: 2,
  frame: 1
})

setInterval(() => {
  draw()
}, 300)
