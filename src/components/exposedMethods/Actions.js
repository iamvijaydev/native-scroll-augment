import styled, { keyframes } from 'styled-components'

const Actions = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 5rem;
  display: flex;
  justify-content: center;
`
  
const show = keyframes`
  0% {
    opacity: 0;
    top: -30px;
  }
  
  100% {
    opacity: 1;
    top: 0;
  }
`;
  
const Item = styled.div`
  display: ${props => props.isHidden ? 'none' : 'block'};
  position: relative;
  margin: 0 1rem;
  animation: ${show} .5s ease forwards;
  flex-basis: ${props => props.isInput ? '7rem' : 'initial'};
`

const Button = styled.button`
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
  transition: all 0.3s ease;

  &:active {
    outline-color: #ff8e77;
    box-shadow: 0 0 0 #af3b23;
    color: #fff7f3;
    background-color: #d84627;
  }

  &:disabled {
    background: #b1b1b1;
    color: #6d6d6d;
    border-color: #c1c1c1;
    cursor: not-allowed;
  }
`

const Input = styled.input`
  padding: 0.5rem 1rem;
  width: 100%;
  box-sizing: border-box;
  border-radius: 3px;
  color: #037;
  font-size: 1.2rem;
  cursor: pointer;
  border: 1px solid #396db3;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  background: #ddecff;

  &:focus {
    border-color: #000;
    background: #fff;
  }
`

Actions.Item = Item
Actions.Button = Button
Actions.Input = Input

export default Actions
