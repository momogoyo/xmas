class Resource {
  constructor () {
    this.toLoad = {
      sky: '/sprites/sky.png',
      ground: '/sprites/ground.png',
      metheduck: '/sprites/metheduck.png',
      shadow: '/sprites/shadow.png',
    }
    this.images = {}

    this.onLoad()
  }

  onLoad () {
    Object.keys(this.toLoad).forEach((key) => {
      const image = new Image()
      image.src = this.toLoad[key]
      
      this.images[key] = {
        image,
        isLoaded: false
      }

      image.onload = () => {
        this.images[key].isLoaded = true
      }
    })
  }
}

export const resource = new Resource()