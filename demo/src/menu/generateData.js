// const genetateButtonsEg2 = () => {
//   'scroll-to-position',
//     'scroll-by-value'
//   'Scroll to position',
//     'Scroll by value'
// }

export const generateData = () => {
  const $menuWrap = document.createElement('div')
  const ids = [
    'read-me',
    'load-connect-scroll-eg-1',
    'load-connect-scroll-eg-2',
    'load-kinetic-scroll',
    'load-exposed-methods-eg-1',
    'load-exposed-methods-eg-2'
  ]
  const names = [
    'Read Me',
    'Connected Scroll eg. 1',
    'Connected Scroll eg. 2',
    'Kinetic Scroll',
    'Exposed Methods eg. 1',
    'Exposed Methods eg. 2'    
  ]
  let $item;
  let $name;

  for (let i = 0; i < 6; i++) {
    $item = document.createElement('div')
    $item.id = ids[i];
    $item.classList.add('menuitem')

    $name = document.createElement('span')
    $name.innerHTML = names[i];
    $name.classList.add('menuitem__name')

    $item.appendChild($name)

    if (i === 0) {
      $item.classList.add('menuitem--active')
    }

    $menuWrap.appendChild($item)
  }

  $menuWrap.classList.add('menu')

  return $menuWrap;
}
