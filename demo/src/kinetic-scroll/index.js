import NativeScrollAugment from '../../../dist'

import { kineticData } from './generateData'
import { styles } from './styles'
import { injectStyles } from '../utils'

export const loadKineticScroll = ($root) => {
  return new Promise((resolve) => {
    const $parent = document.createElement('div')
    const $scrollArea1 = document.createElement('div')

    $parent.id = "connect-scroll-eg-1"
    $scrollArea1.id = "scroll-area-1"

    $parent.appendChild($scrollArea1)

    $root.innerHTML = ''
    $root.appendChild($parent)

    resolve($parent)
  })
}

export const startKineticScroll = ($parent) => {
  const $scrollArea1 = document.querySelector('#scroll-area-1')

  $parent.classList.add('parent')
  $scrollArea1.classList.add('area')
  injectStyles({
    uid: 'KINETIC_STYLES',
    styles
  })


  $scrollArea1.appendChild(kineticData());

  const nsa = new NativeScrollAugment({
    parent: $parent,
    scrollsAreas: [$scrollArea1],
    options: { enableKinetics: true, movingAverage: 0.2 }
  })

  nsa.init();

  return nsa;
}
