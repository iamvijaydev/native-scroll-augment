import styled from 'styled-components'

export const Cell = styled.div`
  padding: 20px 0;
  height: 25px;
  position: relative;
  width: 100px;
  flex-basis: 100px;
  border-right: 1px solid #eaeaea;

  &:after {
    content: ' ';
    position: absolute;
    top: 20px;
    height: 25px;
    background: #eaeaea;
    left: 20px;
    right: 20px;
    border-radius: 10px;
  }
`

export const CellActive = Cell.extend`
  background: #eaeaea;
  border-right: 1px solid #d8d8d8;

  &:after {
    background: #ccc;
  }
`
