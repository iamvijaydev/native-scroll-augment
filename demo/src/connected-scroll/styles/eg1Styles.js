export const styles = `
  .parent {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
    padding: 30px 0;
    height: 30px;
    position: relative;
  }

  .area li:not(:last-child) {
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .area li:before,
  .area li:after {
    content: ' ';
    position: absolute;
    top: 33px;
    height: 25px;
    background: rgba(0,0,0,.1)
  }

  .area li:before {
    left: 25px;
    width: 25px;
    border-radius: 50%;
  }

  .area li:after {
    left: 75px;
    right: 25px;
    border-radius: 10px;
  }
`
