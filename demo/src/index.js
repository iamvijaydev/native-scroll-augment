import {
  extenb
} from 'lodash'
import NativeScrollAugment from '../../dist'
import {
  startConnectScrollEg1,
  startConnectScrollEg2
} from './connected-scroll'

const startKineticScrolling = ($parent) => {
  const $scrollArea = document.querySelector('#scroll-area')
  const nsa = new NativeScrollAugment($parent, [$scrollArea], {})
}
const startMethodsEg1 = ($parent) => {
  const $scrollArea = document.querySelector('#scroll-area')
  const nsa = new NativeScrollAugment($parent, [$scrollArea], {})
}
const startMethodsEg2 = ($parent) => {
  const $scrollArea = document.querySelector('#scroll-area')
  const nsa = new NativeScrollAugment($parent, [$scrollArea], {})
}

const $connectScrollEg1 = document.querySelector('#connect-scroll-eg-1')
const $connectScrollEg2 = document.querySelector('#connect-scroll-eg-2')
const $kineticScrolling = document.querySelector('#kinetic-scrolling')
const $methodsEg1 = document.querySelector('#methods-eg-1')
const $methodsEg2 = document.querySelector('#methods-eg-2')

if (!!$connectScrollEg1) {
  startConnectScrollEg1($connectScrollEg1)
} else if (!!$connectScrollEg2) {
  startConnectScrollEg2($connectScrollEg2)
} else if (!!$kineticScrolling) {
  startKineticScrolling($kineticScrolling)
} else if (!!$methodsEg1) {
  startMethodsEg1($methodsEg1)
} else if (!!$methodsEg2) {
  startMethodsEg2($methodsEg2)
}
