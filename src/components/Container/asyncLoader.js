const fetchComp = (selectedMenu) => {
  switch (selectedMenu) {
    case 'read-me':
      return import('../Readme')

    case 'load-connect-scroll-eg-1':
      return import('../ConnectedScroll/Eg1')

    case 'load-connect-scroll-eg-2':
      return import('../ConnectedScroll/Eg2')

    case 'load-kinetic-scroll':
      return import('../KineticScroll')

    case 'load-exposed-methods-eg-1':
    case 'load-exposed-methods-eg-2':
    default:
      return new Promise(resolve => resolve());
  }
}

export default selectedMenu => fetchComp(selectedMenu)
  .then(ResolvedComponent => ResolvedComponent ? ResolvedComponent.default || ResolvedComponent : null)
