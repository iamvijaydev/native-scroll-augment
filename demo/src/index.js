import NativeScrollAugment from '../../dist'
import {
  loadConnectScrollEg1,
  startConnectScrollEg1,
  loadConnectScrollEg2,
  startConnectScrollEg2
} from './connected-scroll'
import {
  loadKineticScroll,
  startKineticScroll
} from './kinetic-scroll'
import {
  loadExposedMethodsScroll,
  startExposedMethodsScroll
} from './exposed-methods'
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
      currentInst.destroy();
      return loadConnectScrollEg1($container)
        .then(({ $parent, scrollAreas }) => {
          currentInst = startConnectScrollEg1($parent, scrollAreas)

          return true
        })

    case 'load-connect-scroll-eg-2':
      currentInst.destroy();
      return loadConnectScrollEg2($container)
        .then(({ $parent, scrollAreas }) => {
          currentInst = startConnectScrollEg2($parent, scrollAreas)

          return true
        })

    case 'load-kinetic-scroll':
      currentInst.destroy();
      return loadKineticScroll($container)
        .then(({ $parent, scrollAreas }) => {
          currentInst = startKineticScroll($parent, scrollAreas)

          return true
        })

    case 'load-exposed-methods':
      currentInst.destroy();
      return loadExposedMethodsScroll($container)
        .then(({ $parent, scrollAreas }) => {
          currentInst = startExposedMethodsScroll($parent, scrollAreas)

          return true
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

    processClick($found.id);
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
  }
  
  const $found = findMatchingNode(event.target, 'DIV')

  switch ($found.id) {
    case value:
      
      break;
  
    default:
      break;
  }
}

$exposedMethods.addEventListener('click', processExposedMethodsHandler, false)

injectStyles({
  uid: 'COMMON_STYLES',
  styles
})
