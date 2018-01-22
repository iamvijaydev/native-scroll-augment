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
