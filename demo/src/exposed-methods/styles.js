export const styles = `
  #exposed-methods-scroll-eg-1 {
    margin: 10rem;
  }

  #exposed-methods-scroll-eg-1 .grid {
    left: 0;
    top: 0;
  }

  .actions {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 6.3rem;
    display:flex;
    justify-content: center;
  }

  @keyframes show {
    0% {
      opacity: 0;
      top: -30px;
    }

    100% {
      opacity: 1;
      top: 0;
    }
  }

  .action {
    position: relative;
    margin: 0 1rem;
    animation: show .5s ease forwards;
  }

  .action--hidden {
    display: none;
  }

  .action__button {
    background-color: #ffa200;
    padding: 0.5rem 1rem;
    width: 100%;
    box-sizing: border-box;
    border-radius: 35px;
    color: #037;
    font-size: 1.2rem;
    cursor: pointer;
    border: 1px solid #e0edff;
    text-transform: uppercase;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif;
    outline: none;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .action__button:active {
    outline-color: #ff8e77;
    box-shadow: 0 0 0 #af3b23;
    color: #fff7f3;
    background-color: #d84627;
  }
`
