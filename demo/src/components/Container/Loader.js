import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from: {
    opacity: 0
  }
  to {
    opacity: 1
  }
`

const loading = keyframes`
    0% {left: -200px; width: 30%;}
    50% {width: 30%;}
    70% {width: 70%;}
    80% { left: 50%;}
    95% {left: 120%;}
    100% {left: 100%;}
`

const Loader = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} .5s ease;
`

const Indicator = styled.div`
  height: 4px;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #fff;

  &:before {
    display: block;
    position: absolute;
    content: "";
    left: -200px;
    width: 200px;
    height: 4px;
    background-color: #d84627;
    animation: ${loading} 2s linear infinite;
  }
`

Loader.Indicator = Indicator;

export default Loader
