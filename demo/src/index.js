import NativeScrollAugment from '../../dist'

import {
  styles
} from './styles'
import { injectStyles } from './utils'


const $container = document.querySelector('#container')
const $menu = document.querySelector('#menu')
let $currentMenu = document.querySelector('#default')
const $exposedMethods = document.querySelector('#exposed-methods')

let currentInst = {
  destroy: () => {}
};

const findMatchingNode = (target, node) => {

  // escape hatch
  if (!node || target.tagName.toUpperCase() === 'BODY') {
    return false;
  }

  if (target.tagName.toUpperCase() === node) {
    return target;
  }

  return findMatchingNode(target.parentElement, node)
}

const processClick = (id) => {
  switch(id) {
    case 'load-connect-scroll-eg-1':
      return import('./connected-scroll-eg-1')
        .then(({ loadConnectScrollEg1, startConnectScrollEg1 }) => {
          currentInst.destroy();

          return loadConnectScrollEg1($container)
            .then(({ $parent, scrollAreas }) => {
              return startConnectScrollEg1($parent, scrollAreas)
            })
        })

    case 'load-connect-scroll-eg-2':
      return import('./connected-scroll-eg-2')
        .then(({ loadConnectScrollEg2, startConnectScrollEg2 }) => {
          currentInst.destroy();

          return loadConnectScrollEg2($container)
            .then(({ $parent, scrollAreas }) => {
              return startConnectScrollEg2($parent, scrollAreas)
            })
        })

    case 'load-kinetic-scroll':
      return import('./kinetic-scroll')
        .then(({ loadKineticScroll, startKineticScroll }) => {
          currentInst.destroy();

          return loadKineticScroll($container)
            .then(({ $parent, scrollAreas }) => {
              return startKineticScroll($parent, scrollAreas)
            })
        })

    case 'load-exposed-methods':
      return import('./exposed-methods')
        .then(({ loadExposedMethodsScroll, startExposedMethodsScroll }) => {
          currentInst.destroy();

          return loadExposedMethodsScroll($container)
            .then(({ $parent, scrollAreas }) => {
              return startExposedMethodsScroll($parent, scrollAreas)
            })
        })

    default:
      return new Promise(resolve => resolve(true))
  }
}

const chooseMenuHandler = (event) => {
  const $found = findMatchingNode(event.target, 'DIV')

  if ($found && !$found.classList.contains('active')) {
    $found.classList.add('active')

    $currentMenu.classList.remove('active');
    $currentMenu = $found;

    processClick($found.id)
      .then(inst => {
        if (typeof inst !== typeof true) {
          currentInst = inst;
        }
      })
  }
}

$menu.addEventListener('click', chooseMenuHandler, false)

const processExposedMethodsHandler = (event) => {
  event.stopPropagation();

  // if not loaded
  if ($currentMenu.id !== 'load-exposed-methods') {
    $currentMenu.classList.remove('active')
    $currentMenu = document.querySelector('#load-exposed-methods')
    $currentMenu.classList.remove('active')

    processClick('load-exposed-methods')
      .then(inst => {
        if (typeof inst !== typeof true) {
          currentInst = inst;
        }
      })
  }
  
  const $found = findMatchingNode(event.target, 'DIV')

  setTimeout(() => {
    switch ($found.id) {
      case 'scroll-to-start':
        currentInst.scrollToStart();
        return;
        
      case 'scroll-to-start-left':
        currentInst.scrollToStartLeft();
        return;

      case 'scroll-to-start-top':
        currentInst.scrollToStartTop();
        return;

      case 'scroll-to-end':
        currentInst.scrollToEnd();
        return;

      case 'scroll-to-end-left':
        currentInst.scrollToEndLeft();
        return;

      case 'scroll-to-end-top':
        currentInst.scrollToEndTop();
        return;

      case 'scroll-to-start1':
        currentInst.scrollToStart();
        return;

      case 'scroll-to-start2':
        currentInst.scrollToStart();
        return;

      default:
        break;
    }
  }, 100)
}

$exposedMethods.addEventListener('click', processExposedMethodsHandler, false)

injectStyles({
  uid: 'COMMON_STYLES',
  styles
})