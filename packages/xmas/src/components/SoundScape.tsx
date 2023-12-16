import { h } from 'preact'
import { css } from '@emotion/css'
import Space from '@/assets/space.png'
import Metheduck from '@/assets/me.png'
import Bed from '@/assets/bed.png'
import Fireplace from '@/assets/fireplace.png'
import Tree from '@/assets/tree.png'
import Carpet from '@/assets/carpet.png'
import Desk from '@/assets/desk.png'

import type { Howl } from 'howler'

const Xmas = () => {
  return (
    <div class={`Xmas ${ecss.Xmas}`}>
      <div class={`Location ${ecss.Location} ${ecss.Object}`}>
        <div class={`Space ${ecss.Space}`} style={{ backgroundImage: `url('${Space}')` }}>
          <div class={`Metheduck ${ecss.Me} ${ecss.Object}`}>
            <img src={Metheduck} alt="" />
          </div>
          <div class={`Bed ${ecss.Bed} ${ecss.Object}`}>
            <img src={Bed} alt="" />
          </div>
          <div class={`Tree ${ecss.Tree} ${ecss.Object}`}>
            <img src={Tree} alt="" />
          </div>
          <div class={`Fireplace ${ecss.Fireplace} ${ecss.Object}`}>
            <img src={Fireplace} alt="" />
          </div>
          <div class={`Carpet ${ecss.Carpet} ${ecss.Object}`}>
            <img src={Carpet} alt="" />
          </div>
          <div class={`Desk ${ecss.Desk} ${ecss.Object}`}>
            <img src={Desk} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

const ecss = {
  Xmas: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: rgb(0, 0, 0);
    /* background: radial-gradient(circle, rgba(103,101,142,1) 0%, rgba(46,40,74,1) 56%, rgba(49,51,106,1) 100%); */
  `,

  Location: css`
    width: 100%;
    height: 100%;
    `,

  Space: css`
    position: relative;
    width: 970px;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50%;
    margin: 0 auto;
  `,

  Object: css`
    position: absolute;
    
    > img {
      width: 100%;
      object-fit: contain;
    }
  `,

  Me: css`
    width: 10.56%;
    top: 12.56%;
    left: 17.5%;
    z-index: 2;
    transform: rotate(-6deg);
  `,

  Bed: css`
    width: 22.45%;
    top: 12.06%;
    left: 10.50%;
  `,

  Tree: css`
    width: 16.53%;
    left: 43.41%;
    
  `,

  Fireplace: css`
    width: 16.11%;
  `,

  Carpet: css`
    width: 44.67%;
    top: 28.65%;
    left: 27.57%;
  `,

  Desk: css`
    width: 20.14%;
    top: 8.60%;
  `,
}

export default Xmas