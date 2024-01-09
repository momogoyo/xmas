// 대상, 목적지, 스피드
export const moveTowards = (target, destinationPosition, speed) => {
  let distanceToX = destinationPosition.x - target.position.x
  let distanceToY = destinationPosition.y - target.position.y

  // 이동할 수 있는 실제 거리
  // 유클리드 거리 공식: 두 점 사이의 가장 짧은 거리(직선 거리)를 계산하는 공식
  let distance = Math.sqrt(Math.pow(distanceToX, 2) + Math.pow(distanceToY, 2))

  // 대상이 목적지에 이동하기 위한 최대 속도 이하일 때
  if (distance <= speed) {
    // 한번의 이동으로 목적지까지 이동할 수 있는 경우
    target.position.x = destinationPosition.x
    target.position.y = destinationPosition.y
  } else {
    // 목적지까지 한번에 이동할 수 없는 경우
    // 방향 벡터를 단위 벡터로 만들기(길이가 1인 벡터) 위한 정규화 - 타겟이 이동해야할 방향을 유지하면서도 거리를 고려해서 이동
    const normalizedX = distanceToX / distance
    const normalizedY = distanceToY / distance
    
    target.position.x += normalizedX * speed
    target.position.y += normalizedY * speed

    // 움직인 후 남아있는 거리를 계산
    distanceToX = destinationPosition.x - target.position.x
    distanceToY = destinationPosition.y - target.position.y
    distance = Math.sqrt(Math.pow(distanceToX, 2) + Math.pow(distanceToY, 2))
  }

  return distance
}