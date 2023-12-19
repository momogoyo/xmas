import './style.css'
import { resources } from './src/resources'

const canvas = document.querySelector('#xmas-canvas')
const context = canvas.getContext('2d')

const draw = () => {
  const sky = resources.images.sky

  if (sky.isLoaded) {
    context.drawImage(sky.image, 0, 0)
  }

  const ground = resources.images.ground

  if (ground.isLoaded) {
    context.drawImage(ground.image, 0, 0)
  }

  const hero = resources.images.hero

  if (hero.isLoaded) {
    context.drawImage(hero.image, 0, 0)
  }

  const shadow = resources.images.shadow

  if (shadow.isLoaded) {
    context.drawImage(shadow.image, 0, 0)
  }
}

setInterval(() => {
  draw()
}, 300)
