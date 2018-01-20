export const styles = `
  html {
    font-size: 62.5%;
  }

  body {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
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

  #menu .btn-wrap {
    padding: 1rem 1.2rem;
  }

  #menu button {
    position: relative;
    background-color: #FF502B;
    padding: 1rem 0;
    width: 100%;
    box-sizing: border-box;
    border-radius: 3px;
    color: #ffd9c5;
    font-size: 1.2rem;
    cursor: pointer;
    border: none;
    outline-offset: -3px;
    outline-style: dashed;
    outline-width: 1px;
    outline-color: #ff6b4d;
    box-shadow: 0 2px 0 #af3b23;
    text-transform: uppercase;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif;
  }
  #menu button:active {
    top: 2px;
    outline-color: #ff8e77;
    box-shadow: 0 0 0 #af3b23;
    color: #fff7f3;
    background-color: #d84627;
  }

  #container {
    flex-grow: 1;
    position: relative;
    background-color: #2683FF
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
