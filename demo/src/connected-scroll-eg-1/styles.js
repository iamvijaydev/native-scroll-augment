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
`
