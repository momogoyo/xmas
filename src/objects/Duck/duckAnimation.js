const makeStandingFrame = (rootFrame = 0) => {
  return {
    duration: 600,
    frames: [{
      time: 0,
      frame: rootFrame
    }]
  }
}

const makeWalkingFrame = (rootFrame = 0) => {
  return {
    duration: 600,
    frames: [
      { // 서있는 모습
        time: 0,
        frame: rootFrame + 1
      },
      { // 왼쪽 걷기
        time: 150,
        frame: rootFrame
      },
      { // 서있는 모습
        time: 300,
        frame: rootFrame + 1
      },
      { // 오른쪽 걷기
        time: 450,
        frame: rootFrame + 2
      },
    ]
  }
}

export const STAND_DOWN = makeStandingFrame(1)
export const STAND_LEFT = makeStandingFrame(4)
export const STAND_RIGHT = makeStandingFrame(7)
export const STAND_UP = makeStandingFrame(10)

export const WALK_DOWN = makeWalkingFrame(0)
export const WALK_LEFT = makeWalkingFrame(3)
export const WALK_RIGHT = makeWalkingFrame(6)
export const WALK_UP = makeWalkingFrame(9)