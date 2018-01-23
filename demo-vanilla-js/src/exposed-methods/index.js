import NativeScrollAugment from '../../../dist'

import { generateData } from './generateData'
import {
  eg1ActionWrapperComponent,
  eg2ActionWrapperComponent
} from './actionGenerators'
import { styles as sharedStyles } from '../sharedStyles'
import { styles } from './styles'
import { injectStyles } from '../utils'

export const loadExposedMethodsScroll = ($root, currentInst) => {
  return new Promise((resolve) => {
    let $parent;
    let $scrollArea1;

    if (currentInst) {
      $parent = document.querySelector('#exposed-methods-scroll');
      $scrollArea1 = document.querySelector('#scroll-area-1');
    } else {
      $parent = document.createElement('div');
      $scrollArea1 = document.createElement('div');

      $parent.id = 'exposed-methods-scroll';
      $scrollArea1.id = 'scroll-area-1';

      $parent.appendChild($scrollArea1);

      $root.innerHTML = '';
      $root.appendChild($parent);
    }

    resolve({ $parent, scrollAreas: [$scrollArea1] })
  })
}

export const startExposedMethodsScroll = ($parent, scrollAreas, type, currentInst) => {
  const $scrollArea1 = scrollAreas[0];
  const nsa = currentInst ? currentInst : new NativeScrollAugment({
    parent: $parent,
    scrollsAreas: [$scrollArea1],
    options: { enableKinetics: true, movingAverage: 0.05 }
  })

  if (!currentInst) {
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
    nsa.init();
  }

  const eg1Data = [{
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
  const eg2Data = [{
    id: 'scroll-to-start',
    title: 'Scroll to start',
    isHidden: true,
    callback: nsa.scrollToStart.bind(nsa),
  }]
  let actionInstance;

  if (type === 'EG_1') {
    actionInstance = eg1ActionWrapperComponent(eg1Data)
  } else if (type === 'EG_2') {
    actionInstance = eg2ActionWrapperComponent(eg2Data)
  }

  $parent.parentNode.appendChild(actionInstance)

  return nsa;
}
