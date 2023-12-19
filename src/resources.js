class Resource {
  constructor () {
    this.toLoad = {
      sky: '/sprites/sky.png',
      ground: '/sprites/ground.png',
      hero: '/sprites/hero-sheet.png',
      shadow: '/sprites/shadow.png',
    }

    this.images = {}
    
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

export const resources = new Resource()