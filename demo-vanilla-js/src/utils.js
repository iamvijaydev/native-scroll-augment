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

export const findMatchingNode = (target, node) => {

  // escape hatch
  if (!node || target.tagName.toUpperCase() === 'BODY') {
    return false;
  }

  if (target.tagName.toUpperCase() === node.toUpperCase()) {
    return target;
  }

  return findMatchingNode(target.parentElement, node)
}
