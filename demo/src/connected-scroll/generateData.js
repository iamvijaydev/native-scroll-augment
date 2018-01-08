const forEg1 = () => {
  const ul = document.createElement('ul')
  let li;

  for (let i = 0; i < 100; i++) {
    li = document.createElement('li')
    ul.appendChild(li)
  }

  return ul;
}

const forEg2 = () => {
  const yCount = 20;
  const xCount = 30;

  const yList = document.createElement('ul')
  const xHeading = document.createElement('div')
  const xGrid = document.createElement('div')

  xHeading.classList.add('head-wrap')
  xGrid.classList.add('grid-wrap')

  for (let i = 0; i < yCount; i++) {
    let child = document.createElement('li')

    yList.appendChild(child)
  }

  for (let i = 0; i < yCount; i++) {
    let gridRow = document.createElement('div')
    let gridItem
    let headItem

    gridRow.classList.add('grid-row')

    for (let j = 0; j < xCount; j ++) {
      gridItem = document.createElement('div')
      gridItem.classList.add('each-item')
      gridRow.appendChild(gridItem)

      if (i === 0) {
        gridItem = document.createElement('div')
        gridItem.classList.add('each-item')
        xHeading.appendChild(gridItem)
      }
    }

    xGrid.appendChild(gridRow)
  }

  return {
    yList,
    xHeading,
    xGrid
  }
}

export default {
  forEg1,
  forEg2
}
