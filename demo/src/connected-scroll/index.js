import NativeScrollAugment from '../../../dist'

import generateData from './generateData'
import {
  eg1Styles,
  eg2Styles
} from './styles'
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

    resolve($parent)
  })
}

export const startConnectScrollEg1 = ($parent) => {
  const $scrollArea1 = document.querySelector('#scroll-area-1')
  const $scrollArea2 = document.querySelector('#scroll-area-2')

  $parent.classList.add('parent')
  $scrollArea1.classList.add('area')
  $scrollArea2.classList.add('area')
  injectStyles({
    uid: 'CONNECTED_EG1_STYLES',
    styles: eg1Styles
  })

  $scrollArea1.appendChild(generateData.forEg1());
  $scrollArea2.appendChild(generateData.forEg1());

  const nsa = new NativeScrollAugment({
    parent: $parent,
    scrollsAreas: [$scrollArea1, $scrollArea2],
    options: { enableKinetics: true, movingAverage: 0.2 }
  })

  nsa.init()

  return nsa
}

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

    resolve($parent)
  })
}

export const startConnectScrollEg2 = ($parent) => {
  const $scrollArea1 = document.querySelector('#scroll-area-1')
  const $scrollArea2 = document.querySelector('#scroll-area-2')
  const $scrollArea3 = document.querySelector('#scroll-area-3')
  const {
    yList,
    xHeading,
    xGrid
  } = generateData.forEg2()

  console.log($parent)

  $parent.classList.add('parent')
  $scrollArea1.classList.add('sidebar')
  $scrollArea2.classList.add('header')
  $scrollArea3.classList.add('grid')
  injectStyles({
    uid: 'CONNECTED_EG2_STYLES',
    styles: eg2Styles
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
