import {
  extenb
} from 'lodash'
import NativeScrollAugment from '../dist'

const injectStyles = (styles) => {
  const style = document.createElement('style')
  
  style.innerHTML = styles
  document.head.appendChild(style)
}

const parentStyle = `
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

const startConnectScrollEg1 = ($parent) => {
  const $scrollArea1 = document.querySelector('#scroll-area-1')
  const $scrollArea2 = document.querySelector('#scroll-area-2')
  const generateData = ($container) => {
    const ul = document.createElement('ul')
    let li;

    for (let i = 0; i < 100; i++) {
      li = document.createElement('li')
      ul.appendChild(li)
    }

    $container.appendChild(ul);
  }
  const styles = `
    body {
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
      background-color: #fffeef;
    }

    .parent {
      ${parentStyle}
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 70px 50px;
      border: 1px solid #dadada;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    }

    .area {
      flex-grow: 1;
      overflow-x: hidden;
      overflow-y: auto;
    }

    .area ul {
      display: inline-block;
      margin: 0;
      padding: 0;
      width: 100%;
      list-style: none;
    }

    .area li {
      padding: 30px 0;
      height: 30px;
      position: relative;
    }

    .area li:not(:last-child) {
      border-bottom: 1px solid rgba(0,0,0,.1);
    }

    .area li:before,
    .area li:after {
      content: ' ';
      position: absolute;
      top: 33px;
      height: 25px;
      background: rgba(0,0,0,.1)
    }

    .area li:before {
      left: 25px;
      width: 25px;
      border-radius: 50%;
    }

    .area li:after {
      left: 75px;
      right: 25px;
      border-radius: 10px;
    }
  `

  injectStyles(styles)

  $parent.classList.add('parent')
  $scrollArea1.classList.add('area')
  $scrollArea2.classList.add('area')

  generateData($scrollArea1);
  generateData($scrollArea2);

  console.log($parent)

  const nsa = new NativeScrollAugment({
    parent: $parent,
    scrollsAreas: [$scrollArea1, $scrollArea2],
    options: { enableKinetics: true, movingAverage: 0.2 }
  })

  nsa.init();
  console.log(nsa)
}
const startConnectScrollEg2 = ($parent) => {
  const $scrollArea1 = document.querySelector('#scroll-area-1')
  const $scrollArea2 = document.querySelector('#scroll-area-2')
  const $scrollArea3 = document.querySelector('#scroll-area-3')
  const nsa = new NativeScrollAugment($parent, [$scrollArea1, $scrollArea2, $scrollArea3], {})
}
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
