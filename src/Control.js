export const UP = 'UP'
export const LEFT = 'LEFT'
export const DOWN = 'DOWN'
export const RIGHT = 'Right'

export class Control {
  constructor () {
    this.heldDirection = []

    this.addEventListeners()
  }

  get direction () {
    return this.heldDirection[0]
  }

  addEventListeners () {
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    document.addEventListener('keyup', this.handleKeyUp.bind(this))
  }

  handleKeyDown (event) {
    if (event.code === 'ArrowUp' || event.code === 'KeyW') {
      this.onArrowPressed(UP)
    } else if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
      this.onArrowPressed(LEFT)
    } else if (event.code === 'ArrowDown' || event.code === 'KeyS') {
      this.onArrowPressed(DOWN)
    } else if (event.code === 'ArrowRight' || event.code === 'KeyD') {
      this.onArrowPressed(RIGHT)
    }
  }

  handleKeyUp (event) {
    if (event.code === 'ArrowUp' || event.code === 'KeyW') {
      this.onArrowReleased(UP)
    } else if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
      this.onArrowReleased(LEFT)
    } else if (event.code === 'ArrowDown' || event.code === 'KeyS') {
      this.onArrowReleased(DOWN)
    } else if (event.code === 'ArrowRight' || event.code === 'KeyD') {
      this.onArrowReleased(RIGHT)
    }
  }

  onArrowPressed (direction) {
    if (this.heldDirection.indexOf(direction) === -1) {
      // 가장 최근에 눌린 키가 배열의 시작 부분에 위치한다.
      this.heldDirection.unshift(direction)
    }
  }

  onArrowReleased (direction) {
    const index = this.heldDirection.indexOf(direction)
    if (index === -1) {
      return
    }

    // 만약 UP을 누른 상태에서 LEFT 키가 들어오면 LEFT가 우선이 되고,
    // LEFT가 릴리스되면 배열에서 제거되면서 UP이 우선순위로 변경되어 UP이 활성화 된다.
    this.heldDirection.splice(index, 1)
  }
}