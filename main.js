import './style.css'
import { resource } from './src/Resource'

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

  const metheduck = resource.images.metheduck

  if (metheduck.isLoaded) {
    context.drawImage(metheduck.image, 0, 0)
  }

  const shadow = resource.images.shadow

  if (shadow.isLoaded) {
    context.drawImage(shadow.image, 0, 0)
  }
}

setInterval(() => {
  draw()
}, 300)
