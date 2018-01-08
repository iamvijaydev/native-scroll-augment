import NativeScrollAugment from '../../../dist'

import generateData from './generateData'
import {
  commonStyles,
  eg1Styles,
  eg2Styles
} from './styles'
import { injectStyles } from '../utils'

export const startConnectScrollEg1 = ($parent) => {
  const $scrollArea1 = document.querySelector('#scroll-area-1')
  const $scrollArea2 = document.querySelector('#scroll-area-2')

  $parent.classList.add('parent')
  $scrollArea1.classList.add('area')
  $scrollArea2.classList.add('area')
  injectStyles(commonStyles)
  injectStyles(eg1Styles)

  $scrollArea1.appendChild(generateData.forEg1());
  $scrollArea2.appendChild(generateData.forEg1());

  const nsa = new NativeScrollAugment({
    parent: $parent,
    scrollsAreas: [$scrollArea1, $scrollArea2],
    options: { enableKinetics: true, movingAverage: 0.2 }
  })

  nsa.init();
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

  $parent.classList.add('parent')
  $scrollArea1.classList.add('sidebar')
  $scrollArea2.classList.add('header')
  $scrollArea3.classList.add('grid')
  injectStyles(commonStyles)
  injectStyles(eg2Styles)

  $scrollArea1.appendChild(yList);
  $scrollArea2.appendChild(xHeading);
  $scrollArea3.appendChild(xGrid);

  const nsa = new NativeScrollAugment({
    parent: $parent,
    scrollsAreas: [$scrollArea1, $scrollArea2, $scrollArea3],
    options: { enableKinetics: true, movingAverage: 0.1 }
  })

  nsa.init();
}
