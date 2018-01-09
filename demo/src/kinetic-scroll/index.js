import NativeScrollAugment from '../../../dist'

import { kineticData } from './generateData'
import { styles } from './styles'
import {
  styles as commonStyles
} from '../styles'
import { injectStyles } from '../utils'

export const startKineticScroll = ($parent) => {
  const $scrollArea1 = document.querySelector('#scroll-area-1')

  $parent.classList.add('parent')
  $scrollArea1.classList.add('area')
  injectStyles(commonStyles)
  injectStyles(styles)
  $scrollArea1.appendChild(kineticData());

  const nsa = new NativeScrollAugment({
    parent: $parent,
    scrollsAreas: [$scrollArea1],
    options: { enableKinetics: true, movingAverage: 0.2 }
  })

  nsa.init();
}
