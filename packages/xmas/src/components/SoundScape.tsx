import { h } from 'preact'
import { useState, useRef, useEffect } from 'preact/hooks'
import { css } from '@emotion/css'
import { motion, AnimatePresence } from 'framer-motion'
import { Events } from '@/constants'
import sounds from '@/spatial/sounds'
import effects from '@/spatial/effects'
import Wave from '@/components/Wave'

import type { Howl } from 'howler'

type Icons = {
  [key: string]: h.JSX.Element
}

type Audio = {
  key: string
  howl: Howl
  selected: boolean
  x: number
  y: number
}

export type SoundScapeProps = {
  onClose: () => void
}

const icons: Icons = {
  birds: <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 00-7.86 3v1a10.66 10.66 0 01-9-4.53s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>,
  wind: <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.279 7C19.782 7 21 8.12 21 9.5S19.782 12 18.279 12H3M17.938 20c1.139 0 2.562-.5 2.562-2.5S19.077 15 17.937 15H3M10.412 4C11.842 4 13 5.12 13 6.5S11.841 9 10.412 9H3" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>,
  campfire: <svg width="24px" stroke-width="1.5" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 14c0 1.61 1.377 2 3.076 2 2.89 0 3.845-1.667 1.922-5-2.691 3-3.076-1.667-2.691-3C10.153 10 9 11.879 9 14z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 16c3.156 0 5-2.098 5-5.688S12 3 12 3s-5 3.723-5 7.313S8.844 16 12 16z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.273 21.07l15.454-4.14M4.273 16.93L12 19M19.727 21.07l-3.863-1.035" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path></svg>,
  ocean: <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 14a4 4 0 108 0 4 4 0 00-8 0zm0 0V6M22 14a4 4 0 11-8 0 4 4 0 018 0zm0 0V6M14 14h-4" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>,
  keyboard: <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6v12M15 6v12M9 6a3 3 0 10-3 3h12a3 3 0 10-3-3M9 18a3 3 0 11-3-3h12a3 3 0 11-3 3" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>,
  rain: <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 13v7M16 13v7M12 15v7M20 17.607c1.494-.585 3-1.918 3-4.607 0-4-3.333-5-5-5 0-2 0-6-6-6S6 6 6 8c-1.667 0-5 1-5 5 0 2.689 1.506 4.022 3 4.607" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>,
  thunders: <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 12L9 17h6l-2.5 5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 17.607c1.494-.585 3-1.918 3-4.607 0-4-3.333-5-5-5 0-2 0-6-6-6S6 6 6 8c-1.667 0-5 1-5 5 0 2.689 1.506 4.022 3 4.607" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
}

const SoundScape = ({
  onClose
}: SoundScapeProps) => {
  const [_, { play, pause, skipPrev, skipNext }] = sounds()
  const [effectCtx, { current: effectCurrent, play: effectPlay, stop: effectStop }] = effects()
  const MAXVOLUME = 210
  
  const constraintsRef = useRef<HTMLDivElement>(null)
  const constraintsRectRef = useRef<DOMRect>(null)
  const effectRef = useRef<HTMLDivElement>(null)
  const outsideTimer = useRef<ReturnType<typeof setTimeout>>(null)
  
  const [playing, setPlaying] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [audios, setAudios] = useState<Audio[]>(
    Object.keys(effectCtx).map(key => ({
      key,
      howl: effectCtx[key],
      selected: false,
      x: 0,
      y: 0
    }))
  )

  const getRandomPosition = () => {
    const ELEMENT_WIDTH = 48
    const ELEMENT_HEIGHT = 48
    const containerRect = constraintsRectRef.current
    const centerX = containerRect.width / 2
    const centerY = containerRect.height / 2
    const maxRadius = containerRect.width / 2 - ELEMENT_WIDTH / 2
    const minRadius = ELEMENT_WIDTH
    const radius = Math.random() * (maxRadius - minRadius) + minRadius
    const angle = Math.random() * Math.PI * 2
    const x = centerX + radius * Math.cos(angle) - ELEMENT_WIDTH / 2
    const y = centerY + radius * Math.sin(angle) - ELEMENT_HEIGHT / 2

    return {
      x,
      y
    }
  }

  const updatePanner = (
    x: number,
    y: number
  ) => {
    const containerRect = constraintsRectRef.current
    const EFFECT_WIDTH = 48 / 2
    const EFFECT_HEIGHT = 48 / 2

    const centerX = containerRect.width / 2
    const centerY = containerRect.height / 2
    const dX = x - centerX + EFFECT_WIDTH
    const dY = (y - centerY + EFFECT_HEIGHT) * -1

    const distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2))
    const volume = Math.max(0, 1 - (distance + EFFECT_WIDTH) / MAXVOLUME)

    const posX = dX * Math.PI / 180
    const posY = dY * Math.PI / 180
    const posZ = -0.5

    return {
      x: posX,
      y: posY,
      z: posZ,
      volume
    }
  }

  const onPointerDown = (
    event: PointerEvent
  ) => {
    const { currentTarget, pointerId } = event

    if (currentTarget instanceof HTMLDivElement) {
      currentTarget.setPointerCapture(pointerId)
      effectRef.current = currentTarget
    }

    setIsDragging(true)
  }

  const onPointerMove = (
    event: PointerEvent,
    audio: Audio
  ) => {
    if (!isDragging) return

    clearTimeout(outsideTimer.current)

    const containerRect = constraintsRectRef.current
    const currentRef = effectRef.current

    const centerX = containerRect.width / 2
    const centerY = containerRect.height / 2
    const maxRadius = containerRect.width / 2 - currentRef.clientWidth / 2

    const pointerX = event.clientX - containerRect.left
    const pointerY = event.clientY - containerRect.top

    const dx = pointerX - centerX
    const dy = pointerY - centerY
    const distance = Math.sqrt(dx * dx + dy * dy)

    let newX: number, newY: number

    if (distance <= maxRadius) {
      newX = pointerX - currentRef.clientWidth / 2
      newY = pointerY - currentRef.clientHeight / 2
    } else {
      const angle = Math.atan2(dy, dx)

      newX = Math.floor(centerX + maxRadius * Math.cos(angle) - currentRef.clientWidth / 2) - 1
      newY = Math.floor(centerY + maxRadius * Math.sin(angle) - currentRef.clientHeight / 2)

      // 드래그 상태
      if (isDragging) {
        outsideTimer.current = setTimeout(() => {
          setAudios((prevAudios) =>
            prevAudios.map((prevAudio) => {
              if (prevAudio.key === audio.key) {
                audio.howl.stop()
                setIsDragging(false)

                const pauseAudio = {
                  key: audio.key,
                  howl: effectCtx[audio.key],
                  selected: false,
                  x: 0,
                  y: 0
                }
                
                return { ...prevAudio, ...pauseAudio }
              } else {
                return prevAudio
              }
            })
          )
        }, 300)
      }
    }

    const { x, y, z, volume } = updatePanner(newX, newY)

    audio.howl.pos(x, y, z)
    audio.howl.volume(volume)

    setAudios((prevAudios) =>
      prevAudios.map((prevAudio) => {
        if (prevAudio.key === audio.key) {
          return { ...prevAudio, x: newX, y: newY }
        } else {
          return prevAudio
        }
      })
    )
  }

  const onPointerUp = (
    event: PointerEvent
  ) => {
    clearTimeout(outsideTimer.current)

    const { currentTarget, pointerId } = event

    if (currentTarget instanceof HTMLDivElement) {
      currentTarget.releasePointerCapture(pointerId)
      effectRef.current = null
    }

    setIsDragging(false)
  }

  const onPlay = () => {
    if (playing) {
      pause()
    } else {
      play()
    }

    setPlaying(!playing)
  }

  const onResize = () => {
    constraintsRectRef.current = constraintsRef.current.getBoundingClientRect()
  }

  useEffect(() => {
    window.addEventListener(Events.RESIZE, onResize)

    return (() => {
      window.removeEventListener(Events.RESIZE, onResize)
    })
  }, [])

  return (
    <div class={`SoundScape ${ecss.SoundScape}`}>
      <span class={`SoundScape__BG ${ecss.BG}`}></span>
      <div class={`SoundScape__Sounds ${ecss.Sounds}`}>
        {onClose && (
          <motion.button class={`SoundScape__Close ${ecss.Close}`} onClick={onClose} />
        )}
        <AnimatePresence initial={false}>
          {playing && (
            <motion.div
              class={`SoundScape__Wave ${ecss.Wave}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ><Wave /></motion.div>
          )}
        </AnimatePresence>
        <div class={`SoundScape__Controls ${ecss.Controls}`}>
          <motion.button
            class={`SoundScape__Buttons ${ecss.Buttons} ${ecss.Prev}`}
            onClick={skipPrev}
            whileTap={{ scale: 0.9 }}
          ></motion.button>
          <motion.button 
            class={`SoundScape__Buttons ${ecss.Buttons} ${
              playing ? ecss.Play : ecss.Pause
            }`}
            onClick={onPlay}
            whileTap={{ scale: 0.9 }}
          ></motion.button>
          <motion.button
            class={`SoundScape__Buttons ${ecss.Buttons} ${ecss.Next}`}
            onClick={skipNext}
            whileTap={{ scale: 0.9 }}
          ></motion.button>
        </div>
      </div>
      <div style="display: flex;align-items: center;width: 100%;max-width: 400px;height: 400px;">
        <motion.div
          class={`SoundScape__Location ${ecss.Location}`}
          ref={constraintsRef}          
        >
          {audios.map((audio) => (
            audio.selected ? (
              <motion.div 
                class={`Soundscape__Effect ${ecss.Effect}`}
                data-effect={audio.key}
                onPointerDown={(event: PointerEvent) => onPointerDown(event)}
                onPointerMove={(event: PointerEvent) => onPointerMove(event, audio)}
                onPointerUp={(event: PointerEvent) => onPointerUp(event)}
                style={{
                  left: audio.x + 'px',
                  top: audio.y + 'px'
                }}
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
              >{icons[audio.key]}</motion.div>) : null
            ))}
        </motion.div>
      </div>
      <motion.div class={`SoundScape__Effects ${ecss.Effects}`}>
        {Object.keys(effectCtx).map((key, index) => {
          const disable = !!audios.find((audio) => audio.key === key && audio.selected)

          return (<motion.button
            class={`Soundscape__Effect ${ecss.Effect} ${disable ? 'disable' : ''}`}
            id={index}
            data-name={key}
            onClick={() => {
              constraintsRectRef.current = constraintsRef.current.getBoundingClientRect()

              setAudios((audios) => {
                return audios.map((audio) => {
                  if (audio.key === key) {
                    const { x, y } = getRandomPosition()
                    audio.x = x
                    audio.y = y
                    audio.selected = true
                  }

                  return audio
                })                
              })

              audios.map((audio) => {
                if (audio.key === key) {
                  const { x, y, z, volume } = updatePanner(audio.x, audio.y)

                  audio.howl.pos(x, y, z)
                  audio.howl.volume(volume)

                  if (!audio.howl.playing()) {
                    audio.howl.play()
                  }
                }
              })
            }}
          >{icons[key]}</motion.button>)
        })}
      </motion.div>
    </div>
  )
}

const ecss = {
  SoundScape: css`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 32px 24px 42px;
    background-color: rgba(29, 27, 29, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    user-select: none;
    overflow: hidden;
    backdrop-filter: blur(4px);
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-position: 50% 50%;
      background-size: contain;
      background-repeat: no-repeat;
      pointer-events: none;
      filter: grayscale(0.5);
    }
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(360deg, rgba(0,0,0,0.6) 4%, rgba(0,0,0,0) 100%);
      pointer-events: none;
    }
  `,
  Close: css`
    width: 32px;
    height: 32px;
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='24px' height='24px' stroke-width='1' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' color='%23ffffff'%3E%3Cpath d='M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243' stroke='%23ffffff' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-color: transparent;
    border: none;
  `,
  BG: css`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;    
    background-color: #1d1b1d;
    opacity: 0.2;
    pointer-events: none;
  `,
  Sounds: css`
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  `,
  Wave: css`
    position: absolute;
    right: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: scale(0.5);
    pointer-events: none;
  `,
  Controls: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    cursor: pointer;
  `,
  Buttons: css`
    width: 32px;
    height: 32px;
    background-size: contain;
    background-position: center center;
    border: 0;
    outline: none;
    background-color: transparent;
    cursor: pointer;
  `,
  Prev: css`
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='24px' height='24px' stroke-width='1' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' color='%23ffffff'%3E%3Cpath d='M6 7v10M17.028 5.267a.6.6 0 01.972.471v12.524a.6.6 0 01-.972.47l-7.931-6.261a.6.6 0 010-.942l7.931-6.262z' stroke='%23ffffff' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/svg%3E");
    background-size: 24px;
  `,
  Pause: css`
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='24px' height='24px' stroke-width='1' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' color='%23ffffff'%3E%3Cpath d='M6.906 4.537A.6.6 0 006 5.053v13.894a.6.6 0 00.906.516l11.723-6.947a.6.6 0 000-1.032L6.906 4.537z' stroke='%23ffffff' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/svg%3E");
    background-size: 24px;
  `,
  Play: css`
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='24px' height='24px' stroke-width='1' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' color='%23ffffff'%3E%3Cpath d='M6 18.4V5.6a.6.6 0 01.6-.6h2.8a.6.6 0 01.6.6v12.8a.6.6 0 01-.6.6H6.6a.6.6 0 01-.6-.6zM14 18.4V5.6a.6.6 0 01.6-.6h2.8a.6.6 0 01.6.6v12.8a.6.6 0 01-.6.6h-2.8a.6.6 0 01-.6-.6z' stroke='%23ffffff' stroke-width='1'%3E%3C/path%3E%3C/svg%3E");
    background-size: 24px;
  `,
  Next: css`
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='24px' height='24px' stroke-width='1' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' color='%23ffffff'%3E%3Cpath d='M18 7v10M6.972 5.267A.6.6 0 006 5.738v12.524a.6.6 0 00.972.47l7.931-6.261a.6.6 0 000-.942L6.972 5.267z' stroke='%23ffffff' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/svg%3E");
    background-size: 24px;
  `,
  Location: css`
    position: relative;
    z-index: 1;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='29px' height='29px' stroke-width='1' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' color='%23ffffff'%3E%3Cpath d='M17.5 8S19 9.5 19 12s-1.5 4-1.5 4M20.5 5S23 7.5 23 12s-2.5 7-2.5 7M6.5 8S5 9.5 5 12s1.5 4 1.5 4M3.5 5S1 7.5 1 12s2.5 7 2.5 7' stroke='%23ffffff' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M12 13a1 1 0 100-2 1 1 0 000 2z' fill='%23ffffff' stroke='%23ffffff' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: 30px;
    background-position: 50% 50%;
    transform: translateZ(0);

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border: 1px solid #fff;
      border-radius: 50%;
    }
  `,
  Effects: css`
    position: relative;
    z-index: 1;
    display: flex;    
    gap: 16px;
    max-width: calc(100% + 48px);
    padding: 0 24px;
    overflow-x: auto;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  Effect: css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    font-size: 90%;
    border-radius: 50%;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #FFF;
    border: 1px solid #FFF;
    opacity: 1;
    transition: opacity .25s;    
    &[data-effect] {
      position: absolute;
      left: 0;
      top: 0;
      touch-action: none;
      will-change: transform;
    }
    &.disable {
      opacity: 0.4;
      user-select: none;
      cursor: unset;
      pointer-events: none;
    }
  `
}

export default SoundScape