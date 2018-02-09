import styled from 'styled-components'
import {
  Cell,
  CellActive
} from './Cell'

const Grid = styled.div`
  overflow: auto;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: all-scroll;
  cursor: -webkit-grab;
`

const Row = styled.div`
  width: 3000px;
  display: flex;

  &:not(:last-child) {
    border-bottom: 1px solid #eaeaea;
  }
`

const Item = Cell.extend`
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

const ItemActive = CellActive.extend`
  background: #eaeaea;
  border-right: 1px solid #d8d8d8;

  &:after {
    background: #ccc;
  }
`

Grid.Row = Row
Grid.Item = Item
Grid.ItemActive = ItemActive

export default Grid
