import NativeScrollAugment from '../../../dist'

import { generateData } from './generateData'
import { styles } from './styles'
import { injectStyles } from '../utils'

export const loadConnectScrollEg1 = ($root) => {
  return new Promise((resolve) => {
    const $parent = document.createElement('div')
    const $scrollArea1 = document.createElement('div')
    const $scrollArea2 = document.createElement('div')

    $parent.id = "connect-scroll-eg-1"
    $scrollArea1.id = "scroll-area-1"
    $scrollArea2.id = "scroll-area-2"

    $parent.appendChild($scrollArea1)
    $parent.appendChild($scrollArea2)

    $root.innerHTML = ''
    $root.appendChild($parent)

    resolve({ $parent, scrollAreas: [$scrollArea1, $scrollArea2] })
  })
}

export const startConnectScrollEg1 = ($parent, scrollAreas) => {
  const $scrollArea1 = scrollAreas[0]
  const $scrollArea2 = scrollAreas[1]

  $parent.classList.add('parent')
  $scrollArea1.classList.add('area')
  $scrollArea2.classList.add('area')
  injectStyles({
    uid: 'CONNECTED_EG1_STYLES',
    styles: styles
  })

  $scrollArea1.appendChild(generateData());
  $scrollArea2.appendChild(generateData());

  const nsa = new NativeScrollAugment({
    parent: $parent,
    scrollsAreas: [$scrollArea1, $scrollArea2],
    options: { enableKinetics: true, movingAverage: 0.2 }
  })

  nsa.init()

  return nsa
}
