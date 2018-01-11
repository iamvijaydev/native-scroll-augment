export const styles = `
  .grid {
    overflow: auto;
    position: absolute;
    left: 0;
    top: 0;
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
  .grid-row:not(:last-child) {
    border-bottom: 1px solid #eaeaea;
  }

  .each-item {
    padding: 20px 0;
    height: 25px;
    position: relative;
    width: 100px;
    flex-basis: 100px;
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
  .each-item.active {
    background: #eaeaea;
    border-right: 1px solid #d8d8d8;
  }
  .each-item.active:after {
    background: #ccc;
  }
`
