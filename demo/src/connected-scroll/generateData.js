const forEg1 = () => {
  const ul = document.createElement('ul')
  let li;

  for (let i = 0; i < 100; i++) {
    li = document.createElement('li')
    ul.appendChild(li)
  }

  return ul;
}

export default {
  forEg1
}
