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
  const yList = document.createElement('ul')
  const xHeading = document.createElement('div')
  const xGrid = document.createElement('div')

  const yCount = 75;
  const xCount = 100;

  for (let i = 0; i < yCount; i++) {
    let child = document.createElement('li')

    yList.appendChild(child)
  }

  for (let i = 0; i < xCount; i++) {
    let headRow = document.createElement('div')
    let gridRow = document.createElement('div')
    let child

    xHeading.appendChild(headRow)
    
    for (let j = 0; j < yCount; j++) {
      child = document.createElement('div')
      gridRow.appendChild(child)
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
