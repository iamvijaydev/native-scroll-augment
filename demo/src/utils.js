const registry = {}

export const injectStyles = ({ uid, styles }) => {
  if (!registry[uid]) {
    registry[uid] = true

    const style = document.createElement('style')

    style.id = uid
    style.innerHTML = styles
    document.head.appendChild(style)
  }
}
