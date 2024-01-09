export const walls = new Set()

// 가장 왼쪽 잔디
walls.add(`240, 192`) // 왼쪽 위 잔디
walls.add(`240, 240`) // 왼쪽 아래 잔디
walls.add(`288, 192`) // 오른쪽 위 잔디
walls.add(`288, 240`) // 오른쪽 아래 잔디

// 가운데 잔디
walls.add(`432, 144`) // 왼쪽 잔디
walls.add(`480, 144`) // 오른쪽 잔디

// 트리
walls.add(`240, 144`) // 가장 왼쪽 트리
walls.add(`672, 192`) // 오른쪽 가운데 트리
walls.add(`720, 96`) // 기징 오른쪽 트리

// 물
walls.add(`384, 240`) // 가운데 물
walls.add(`432, 240`) // 가운데 물
walls.add(`480, 240`) // 가운데 물
walls.add(`528, 240`) // 가운데 물

walls.add(`720, 192`) // 집

// 바위
walls.add(`624, 288`)
walls.add(`672, 288`)
walls.add(`720, 288`)
