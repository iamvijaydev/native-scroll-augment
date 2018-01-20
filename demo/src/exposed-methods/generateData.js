export const generateData = () => {
  const yCount = 20;
  const xCount = 30;
  const xGrid = document.createElement('div')

  xGrid.classList.add('grid-wrap')

  for (let i = 0; i < yCount; i++) {
    let gridRow = document.createElement('div')
    let gridItem

    gridRow.classList.add('grid-row')

    for (let j = 0; j < xCount; j++) {
      gridItem = document.createElement('div')
      gridItem.classList.add('each-item')

      if (i % 3 === 0) {
        gridItem.classList.add('active')
      }

      gridRow.appendChild(gridItem)
    }

    xGrid.appendChild(gridRow)
  }

  return xGrid;
}

export const generateMethodsButtons = () => {

}
