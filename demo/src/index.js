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
  styles
} from './styles'
import { injectStyles } from './utils'


const $container = document.querySelector('#container')
const $menu = document.querySelector('#menu')
let currentInst = {
  destroy: () => {}
};
let $currentMenu = document.querySelector('#default')

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
      loadConnectScrollEg1($container)
        .then(($parent) => {
          currentInst = startConnectScrollEg1($parent)
        })
      return;

    case 'load-connect-scroll-eg-2':
      currentInst.destroy();
      loadConnectScrollEg2($container)
        .then(($parent) => {
          currentInst = startConnectScrollEg2($parent)
        })
      return;

    case 'load-kinetic-scroll':
      currentInst.destroy();
      loadKineticScroll($container)
        .then(($parent) => {
          currentInst = startKineticScroll($parent)
        })
      return;

    default:
      return;
  }
}

const clickHandler = (event) => {
  const $found = findMatchingNode(event.target, 'DIV')

  if ($found && !$found.classList.contains('active')) {
    $currentMenu.classList.remove('active');
    $found.classList.add('active')

    $currentMenu = $found;

    processClick($found.id);
  }
}

$menu.addEventListener('click', clickHandler, false)

injectStyles({
  uid: 'COMMON_STYLES',
  styles
})
