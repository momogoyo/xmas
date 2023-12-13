# SoundScape

## 소개
SoundScape는 웹 환경에서 BGM, 효과음을 조합한 사운드 환경을 제공하는 공간 음향 패키지입니다.
이 npm 패키지는 Vite, TypeScript, Preact 등의 현대적인 기술을 사용하고 있습니다.

## 시작하기

### 설치
SoundScape를 설치하려면 터미널에서 다음 명령어를 실행하세요

```
npm install @momogoyo/sound-scape
```

## 사용법
사용하고자 하는 프로젝트에 SoundScape를 다음과 같이 `import` 합니다

```javascript
import SoundScape from '@momogoyo/sound-scape'
```

### 실행
다음 명령어로 프로젝트를 실행합니다
파일 변경을 감지하기 때문에 변경에 따라 다시 자동으로 빌드됩니다
```
npm run dev
```

## 의존성
해당 패키지는 다음 의존성을 가지고 있습니다

- `@momogoyo/sound-scape-shared`: utils 집합
- `@emotion/css`: 스타일링을 위한 CSS 스타일을 라이브러리
- `eventemitter3`
- `preact`
- `framer-motion`
- `howler`: 여러 음성 파일을 관리하기 위한 오디오 라이브러리

그리고 다음 개발 의존성을 가지고 있습니다
- `@preact/preset-vite`: Preact 통합을 위한 Vite 프리셋
- `@types/howler`: howler TypeScript
- `@types/node`
- `typescript`
- `vite`: 빌드 도구

## 버전
최신 버전은 1.0.0입니다.

## 저장소
저장소는 [여기](https://github.com/momogoyo/soundScape.git)에서 찾을 수 있습니다.