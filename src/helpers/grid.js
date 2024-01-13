const CELL_SIZE = 48 // 각 셀의 크기(픽셀 단위) - 해당 프로젝트에서는 48px을 기준으로 한다.

export const gridCell = n => {
  return n * CELL_SIZE
}

// 벽의 목록, X, Y를 받아서 해당 위치에 벽이 있는지 없는지 판단한다.
// Set을 사용해서 이동하려는 좌표에 벽이 있는지 확인
export const isSpaceFree = (wall, x, y) => {
  const str = `${x}, ${y}`
  const isWallPresent = wall.has(str)

  return !isWallPresent
}