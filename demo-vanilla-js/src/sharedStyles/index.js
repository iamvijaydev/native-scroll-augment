export const styles = `
  .parent {
    display: flex;
  }

  .area {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .area ul {
    display: inline-block;
    margin: 0;
    padding: 0;
    width: 100%;
    list-style: none;
  }

  .area li {
    padding: 3rem 0;
    height: 3rem;
    position: relative;
  }

  .area li:not(:last-child) {
    border-bottom: 1px solid #eaeaea;
  }

  .area li:before,
  .area li:after {
    content: ' ';
    position: absolute;
    top: 3.3rem;
    height: 2.5rem;
    background: #eaeaea
  }

  .area li:before {
    left: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
  }

  .area li:after {
    left: 75px;
    right: 2.5rem;
    border-radius: 1rem;
  }

  .grid {
    overflow: auto;
    position: absolute;
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
