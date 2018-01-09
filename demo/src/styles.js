export const styles = `
  html {
    font-size: 62.5%;
  }

  body {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    background-color: #0ca9e2;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif;
  }

  #root {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  #menu {
    flex-basis: 20rem;
    background-color: #fff;
    position: relative;
    z-index: 2;
  }
  #menu div {
    padding: 1.5rem;
    font-size: 1.5rem;
    border-bottom: 1px solid #eaeaea;
    color: #a0a0a0;
    cursor: pointer;
    position: relative;
    font-weight: 500;
  }
  #menu .active {
    color: #12779c;
  }
  #menu .active:after {
    content: ' ';
    position: absolute;
    right: -10px;
    top: 4px;
    width: 0; 
    height: 0; 
    border-top: 2rem solid transparent;
    border-bottom: 2rem solid transparent;
    border-left: 2rem solid #fff;
  }

  #container {
    flex-grow: 1;
    position: relative;
    background-color: #0ca9e2;
  }

  .parent {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 7rem;
    background-color: #fff;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 .5rem 2rem rgba(0, 0, 0, 0.34);
  }
`
