import NativeScrollAugment from '../../../dist'

import { generateData } from './generateData'
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

    resolve({ $parent, scrollAreas: [$scrollArea1] })
  })
}

export const startKineticScroll = ($parent, scrollAreas) => {
  const $scrollArea1 = scrollAreas[0]

  $parent.classList.add('parent')
  $scrollArea1.classList.add('area')
  injectStyles({
    uid: 'KINETIC_STYLES',
    styles
  })


  $scrollArea1.appendChild(generateData());

  const nsa = new NativeScrollAugment({
    parent: $parent,
    scrollsAreas: [$scrollArea1],
    options: { enableKinetics: true, movingAverage: 0.2 }
  })

  nsa.init();

  return nsa;
}