export const injectStyles = (styles) => {
  const style = document.createElement('style')

  style.innerHTML = styles
  document.head.appendChild(style)
}
