import { findMatchingNode } from '../utils'

let $container;
let $currentMenu;
let currentInst = {
  destroy: () => { }
};

const processClick = (id) => {
  switch (id) {
    case 'load-connect-scroll-eg-1':
      return import('../connected-scroll-eg-1')
        .then(({ loadConnectScrollEg1, startConnectScrollEg1 }) => {
          currentInst.destroy();

          return loadConnectScrollEg1($container)
            .then(({ $parent, scrollAreas }) => {
              return startConnectScrollEg1($parent, scrollAreas)
            })
        })

    case 'load-connect-scroll-eg-2':
      return import('../connected-scroll-eg-2')
        .then(({ loadConnectScrollEg2, startConnectScrollEg2 }) => {
          currentInst.destroy();

          return loadConnectScrollEg2($container)
            .then(({ $parent, scrollAreas }) => {
              return startConnectScrollEg2($parent, scrollAreas)
            })
        })

    case 'load-kinetic-scroll':
      return import('../kinetic-scroll')
        .then(({ loadKineticScroll, startKineticScroll }) => {
          currentInst.destroy();

          return loadKineticScroll($container)
            .then(({ $parent, scrollAreas }) => {
              return startKineticScroll($parent, scrollAreas)
            })
        })

    case 'load-exposed-methods-eg-1':
    case 'load-exposed-methods-eg-2':
      return import('../exposed-methods')
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

  if ($found && !$found.classList.contains('menuitem--active')) {
    $found.classList.add('menuitem--active')

    $currentMenu.classList.remove('menuitem--active');
    $currentMenu = $found;

    processClick($found.id)
      .then(inst => {
        if (typeof inst !== typeof true) {
          currentInst = inst;
        }
      })
  }
}

export const initEventHandlers = ($menu) => {
  $container = document.querySelector('#container')
  $currentMenu = document.querySelector('#read-me')

  $menu.addEventListener('click', chooseMenuHandler, false)
}
