export const styles = `
  .parent {
    margin: 70px 50px;
    border: 1px solid #dadada;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }

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

  .each-item {
    padding: 20px 0;
    height: 25px;
    position: relative;
    width: 100px;
    flex-basis: 100px;
    border-bottom: 1px solid #eaeaea;
    border-right: 1px solid #eaeaea;
  }

  .each-item:after {
    content: ' ';
    position: absolute;
    top: 20px;
    height: 25px;
    background: #eaeaea;
    left: 20px;
    right: 20px;
    border-radius: 10px;
  }

  .header {
    overflow-x: auto;
    overflow-y: hidden;
    position: absolute;
    border-left: 200px solid #ccc;
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

  .grid {
    overflow: auto;
    position: absolute;
    left: 200px;
    top: 50px;
    right: 0;
    bottom: 0;
  }
  .grid-wrap,
  .grid-row {
    width: 3000px;
  }
  .grid-row {
    display: flex;
  }
`
