export const styles = `
  #menu {
    flex-basis: 20rem;
    background-color: #fff;
    position: relative;
    z-index: 2;
    overflow-y: auto;
    overflow-x: visible;
  }

  .menuitem {
    border-bottom: 1px solid #eaeaea;
    cursor: pointer;
  }

  .menuitem .menuitem__name {
    padding: 1.5rem;
    font-size: 1.5rem;
    color: #6f6f6f;
    display: block;
    transition: all 0.2s ease;
  }

  .menuitem--active .menuitem__name {
    color: #fff;
    background: #1d77ef;
    font-weight: 500;
  }
  
  #menu .submenu {
    display: none;
  }
  #menu .active .submenu {
    display:
`
