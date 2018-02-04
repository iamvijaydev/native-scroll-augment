import styled from 'styled-components'

const Sidebar = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 61px;
  bottom: 0;
  width: 200px;
  z-index: 4;
  background-color: #fff;
  box-shadow: 2px 0 3px #d2d2d2;
`

const List = styled.ul`
  display: inline-block;
  margin: 0;
  padding: 0;
  width: 100%;
  list-style: none;
`

const Item = styled.li`
  padding: 20px 0;
  height: 25px;
  position: relative;

  &:not(:last-child) {
    border-bottom: 1px solid #eaeaea;
  }

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

const ItemActive = Item.extend`
  background: #eaeaea;

  &:after {
    background: #ccc;
  }
`

Sidebar.List = List;
Sidebar.Item = Item;
Sidebar.ItemActive = ItemActive;

export default Sidebar;
