import { generateData } from './generateData'
import { initEventHandlers } from './eventHandlers'
import { styles } from './styles'
import { injectStyles } from '../utils'

export const loadMenu = ($parent) => {
  const $menu = document.querySelector('#menu')

  injectStyles({
    uid: 'MENU_STYLES',
    styles
  })

  $menu.appendChild(generateData());
  initEventHandlers($menu)
}
