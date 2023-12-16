import { Application, Assets, Sprite } from 'pixi.js'
const root = document.querySelector<HTMLDivElement>('#root')

const app = new Application<HTMLCanvasElement>({
  width: 800,
  height: 600,
  backgroundColor: 0xAAAAAA
})

root?.appendChild(app.view)

// 미더덕 Object
const texture = await Assets.load('./player.png')
const duck = new Sprite(texture)

duck.anchor.set(0.5)
duck.x = app.view.width / 2
duck.y = app.view.height / 2

app.stage.addChild(duck)

// Mouse 인터렉션
app.stage.interactive = true
app.stage.on('pointermove', moveDuck)

function moveDuck (event: { data: { global: any } }) {
  const position = event.data.global
  
  duck.x = position.x
  duck.y = position.y
}

