export const styles = `
  .sidebar {
    overflow-x: hidden;
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: 61px;
    bottom: 0;
    width: 200px;
    z-index: 4;
    background-color: #fff;
    box-shadow: 2px 0 3px #d2d2d2;
  }

  .sidebar ul {
    display: inline-block;
    margin: 0;
    padding: 0;
    width: 100%;
    list-style: none;
  }

  .sidebar li {
    padding: 20px 0;
    height: 25px;
    position: relative;
  }

  .sidebar li:not(:last-child) {
    border-bottom: 1px solid #eaeaea;
  }

  .sidebar li:after {
    content: ' ';
    position: absolute;
    top: 20px;
    height: 25px;
    background: #eaeaea;
    left: 20px;
    right: 20px;
    border-radius: 10px;
  }
  .sidebar li.active {
    background: #eaeaea;
  }
  .sidebar li.active:after {
    background: #ccc;
  }

  .header {
    overflow-x: auto;
    overflow-y: hidden;
    position: absolute;
    border-left: 200px solid #d6bf19;
    left: 0;
    top: 0;
    right: 0;
    height: 62px;
    background-color: #fff;
    z-index: 3;
    box-shadow: 0 2px 3px #d2d2d2;
  }
  .head-wrap {
    width: 3000px;
    display: flex;
  }
  .head-wrap .each-item {
    padding: 10px 0;
    border-bottom: none;
  }
  .head-wrap .each-item:after {
    top: 10px;
  }

  #connect-scroll-eg-2 .grid {
    left: 200px;
    top: 62px;
  }
`
