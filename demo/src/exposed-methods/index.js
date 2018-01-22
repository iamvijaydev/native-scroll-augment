import NativeScrollAugment from '../../../dist'

import { generateData } from './generateData'
import { actionWrapperComponent } from './actionGenerators'
import { styles as sharedStyles } from '../sharedStyles'
import { styles } from './styles'
import { injectStyles } from '../utils'

export const loadExposedMethodsScroll = ($root) => {
  return new Promise((resolve) => {
    const $parent = document.createElement('div')
    const $scrollArea1 = document.createElement('div')

    $parent.id = "exposed-methods-scroll-eg-1"
    $scrollArea1.id = "scroll-area-1"

    $parent.appendChild($scrollArea1)

    $root.innerHTML = ''
    $root.appendChild($parent)

    resolve({ $parent, scrollAreas: [$scrollArea1] })
  })
}

export const startExposedMethodsScroll = ($parent, scrollAreas) => {
  const $scrollArea1 = scrollAreas[0]

  $parent.classList.add('parent')
  $scrollArea1.classList.add('grid')

  injectStyles({
    uid: 'SHARED_STYLES',
    styles: sharedStyles
  })
  injectStyles({
    uid: 'EXPOSED_METHOD_STYLES',
    styles
  })

  $scrollArea1.appendChild(generateData());

  const nsa = new NativeScrollAugment({
    parent: $parent,
    scrollsAreas: [$scrollArea1],
    options: { enableKinetics: true, movingAverage: 0.05 }
  })
  const data = [{
    id: 'scroll-to-start',
    title: 'Scroll to start',
    isHidden: true,
    callback: nsa.scrollToStart.bind(nsa),
    hide: ['scroll-to-start', 'scroll-to-start-left', 'scroll-to-start-top'],
    show: ['scroll-to-end', 'scroll-to-end-left', 'scroll-to-end-top']
  }, {
    id: 'scroll-to-end',
    title: 'Scroll to end',
    isHidden: false,
    callback: nsa.scrollToEnd.bind(nsa),
    hide: ['scroll-to-end', 'scroll-to-end-left', 'scroll-to-end-top'],
    show: ['scroll-to-start', 'scroll-to-start-left', 'scroll-to-start-top']
  }, {
    id: 'scroll-to-start-left',
    title: 'Scroll to start left',
    isHidden: true,
    callback: nsa.scrollToStartLeft.bind(nsa),
    hide: ['scroll-to-start-left'],
    show: ['scroll-to-end-left']
  }, {
    id: 'scroll-to-end-left',
    title: 'Scroll to end left',
    isHidden: false,
    callback: nsa.scrollToEndLeft.bind(nsa),
    hide: ['scroll-to-end-left'],
    show: ['scroll-to-start-left']
  }, {
    id: 'scroll-to-start-top',
    title: 'Scroll to start top',
    isHidden: true,
    callback: nsa.scrollToStartTop.bind(nsa),
    hide: ['scroll-to-start-top'],
    show: ['scroll-to-end-top']
  }, {
    id: 'scroll-to-end-top',
    title: 'Scroll to end top',
    isHidden: false,
    callback: nsa.scrollToEndTop.bind(nsa),
    hide: ['scroll-to-end-top'],
    show: ['scroll-to-start-top']
  }]

  $parent.parentNode.appendChild(actionWrapperComponent(data))

  nsa.init();
  return nsa;
}
