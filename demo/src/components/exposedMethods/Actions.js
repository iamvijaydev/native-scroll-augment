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
  margin: ${props => props.isInput ? '0' : '0 3rem 0 0'};
  animation: ${show} .5s ease forwards;
  flex-basis: ${props => props.isInput ? '5rem' : 'initial'};
`

const Button = styled.button`
  background-color: #ffa200;
  padding: 0.5rem 1rem;
  width: 100%;
  box-sizing: border-box;
  border-radius: ${props => props.isFormBtn ? '0 35px 35px 0' : '35px'};
  color: #037;
  font-size: 1.2rem;
  cursor: pointer;
  border: 1px solid #e0edff;
  text-transform: uppercase;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.2s ease;

  &:active {
    box-shadow: 0 0 0 #af3b23;
    color: #fff7f3;
    background-color: #d84627;
  }

  &:disabled {
    background: #b1b1b1;
    color: #6d6d6d;
    cursor: not-allowed;
    text-shadow: 0 1px 0 #c5c5c5;
  }
`

const Input = styled.input`
  padding: 0.5rem 1rem;
  width: 100%;
  box-sizing: border-box;
  border-radius: ${props => props.roundEdge ? '35px 0 0 35px' : '0'};
  border: 1px solid #e0edff;
  border-width: ${props => props.roundEdge ? '1px 0 1px 1px' : '1px 0 1px 1px'};
  color: #037;
  font-size: 1.2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  background: #ffd996;

  &:focus {
    background: #ffbe4e;
  }
`

Actions.Item = Item
Actions.Button = Button
Actions.Input = Input

export default Actions
