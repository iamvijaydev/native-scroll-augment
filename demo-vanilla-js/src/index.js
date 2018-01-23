import { styles } from './styles'
import {
  loadMenu
} from './menu'
import {
  injectStyles,
} from './utils'

loadMenu();

injectStyles({
  uid: 'COMMON_STYLES',
  styles
})
