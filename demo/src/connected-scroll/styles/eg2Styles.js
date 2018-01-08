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
    top: 50px;
    bottom: 0;
    width: 200px;
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
    width: 150px;
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
    height: 50px;
  }
  .head-wrap {
    width: 2000px;
    display: flex;
  }
  .head-wrap .each-item {
    padding: 0;
  }

  .grid {
    overflow: auto;
    position: absolute;
    left: 200px;
    top: 50px;
    right: 0;
    bottom: 0;
  }
  .grid-wrap {
    width: 2000px;
    display: flex;
  }
`
