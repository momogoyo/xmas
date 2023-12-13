import { h } from 'preact'
import { css } from '@emotion/css'

const Wave = () => {
  return (
    <div class={`${ecss.Wave}`}>
      {[...new Array(6)].map((_) => (<div class={`${ecss.Bar}`}></div>))}
    </div>
  )
}

const ecss = {
  Wave: css`
    width: 120px;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  `,
  Bar: css`
    display: block;
    width: 2px;
    margin-right: 1px;
    height: 90px;
    background: #FFF;
    animation: sound 0ms -800ms linear infinite alternate;
    transition: height 0.8s;

    @keyframes sound {
      0% {
        opacity: .35;
        height: 6px; 
      }
      100% {
        opacity: 1;       
        height: 46px;
      }
    }

    &:nth-child(1)  { height: 2px; animation-duration: 474ms; }
    &:nth-child(2)  { height: 10px; animation-duration: 433ms; }
    &:nth-child(3)  { height: 18px; animation-duration: 407ms; }
    &:nth-child(4)  { height: 26px; animation-duration: 458ms; }
    &:nth-child(5)  { height: 30px; animation-duration: 400ms; }
    &:nth-child(6)  { height: 32px; animation-duration: 427ms; }
    &:nth-child(7)  { height: 34px; animation-duration: 441ms; }
    &:nth-child(8)  { height: 36px; animation-duration: 419ms; }
    &:nth-child(9)  { height: 40px; animation-duration: 487ms; }
    &:nth-child(10) { height: 46px; animation-duration: 442ms; }
  `
}

export default Wave