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
    overflow-y: auto;
    overflow-x: visible;
  }
  #menu > div {
    border-bottom: 1px solid #eaeaea;
    cursor: pointer;
  }
  #menu span {
    padding: 1.5rem;
    font-size: 1.5rem;
    color: #6f6f6f;
    display: block;
    transition: all 0.2s ease;
  }
  #menu .active span {
    color: #fff;
    background: #0a8ebd;
    font-weight: 500;
  }

  #menu .btn-wrap {
    padding: 1rem;
  }

  #menu button {
    background-color: #c1c1c1;
    padding: 1rem 0;
    width: 100%;
    box-sizing: border-box;
    border-radius: 3px;
    color: #4c4c4c;
    font-size: 1.5rem;
    cursor: pointer;
    border: none;
    outline-offset: -3px;
    outline-style: dashed;
    outline-width: 1px;
    outline-color: #eaeaea;
  }
  #menu button:disabled {
    background-color: #eaeaea;
    outline-color: #ffffff;
    color: #9a9a9a;
    cursor: not-allowed;
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
