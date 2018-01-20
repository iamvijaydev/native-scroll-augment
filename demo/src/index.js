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

// const defaultState = {
//   'scroll-to-start': false,
//   'scroll-to-end': true,
//   'scroll-to-start-left': false,
//   'scroll-to-end-left': true,
//   'scroll-to-start-top': false,
//   'scroll-to-end-top': true
// }
// const reducer = (state = defaultState, action) {
//   switch(action) {
//     case 'clicked/scroll-to-end':
//       return {
//         ...state,
//         'scroll-to-start': true,
//         'scroll-to-end': false
//       }

//     case 'clicked/scroll-to-start':
//       return {
//         ...state,
//         'scroll-to-start': false,
//         'scroll-to-end': true
//       }

//     case 'clicked/scroll-to-end-left':
//       return {
//         ...state,
//         'scroll-to-start-left': true,
//         'scroll-to-end-left': false
//       }

//     case 'clicked/scroll-to-start-left':
//       return {
//         ...state,
//         'scroll-to-start-left': false,
//         'scroll-to-end-left': true
//       }

//     case 'clicked/scroll-to-end-top':
//       return {
//         ...state,
//         'scroll-to-start-top': true,
//         'scroll-to-end-top': false
//       }

//     case 'clicked/scroll-to-start-top':
//       return {
//         ...state,
//         'scroll-to-start-top': false,
//         'scroll-to-end-top': true
//       }

//     default:
//       return state
//   }
// }
