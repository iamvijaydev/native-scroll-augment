import NativeScrollAugment from '../../../dist'

import { generateData } from './generateData'
import { styles as sharedStyles } from '../sharedStyles'
import { styles } from './styles'
import { injectStyles } from '../utils'

export const loadConnectScrollEg2 = ($root) => {
  return new Promise((resolve) => {
    const $parent = document.createElement('div')
    const $scrollArea1 = document.createElement('div')
    const $scrollArea2 = document.createElement('div')
    const $scrollArea3 = document.createElement('div')

    $parent.id = "connect-scroll-eg-2"
    $scrollArea1.id = "scroll-area-1"
    $scrollArea2.id = "scroll-area-2"
    $scrollArea3.id = "scroll-area-3"

    $parent.appendChild($scrollArea1)
    $parent.appendChild($scrollArea2)
    $parent.appendChild($scrollArea3)

    $root.innerHTML = ''
    $root.appendChild($parent)

    resolve({ $parent, scrollAreas: [$scrollArea1, $scrollArea2, $scrollArea3] })
  })
}

export const startConnectScrollEg2 = ($parent, scrollAreas) => {
  const $scrollArea1 = scrollAreas[0]
  const $scrollArea2 = scrollAreas[1]
  const $scrollArea3 = scrollAreas[2]
  const {
    yList,
    xHeading,
    xGrid
  } = generateData()

  $parent.classList.add('parent')
  $scrollArea1.classList.add('sidebar')
  $scrollArea2.classList.add('header')
  $scrollArea3.classList.add('grid')
  
  injectStyles({
    uid: 'SHARED_STYLES',
    styles: sharedStyles
  })
  injectStyles({
    uid: 'CONNECTED_EG2_STYLES',
    styles: styles
  })

  $scrollArea1.appendChild(yList);
  $scrollArea2.appendChild(xHeading);
  $scrollArea3.appendChild(xGrid);

  const nsa = new NativeScrollAugment({
    parent: $parent,
    scrollsAreas: [$scrollArea1, $scrollArea2, $scrollArea3],
    options: { enableKinetics: true, movingAverage: 0.1 }
  })

  nsa.init()

  return nsa
}
