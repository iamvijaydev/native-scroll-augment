import styled from 'styled-components'

const Header = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  position: absolute;
  border-left: 200px solid #2ecc71;
  left: 0;
  top: 0;
  right: 0;
  height: 62px;
  background-color: #fff;
  z-index: 3;
  box-shadow: 0 2px 3px #d2d2d2;
`

const Row = styled.div`
  width: 3000px;
  display: flex;
`

const Item = styled.div`
  padding: 10px 0;
  border-bottom: none;

  &:after {
    top: 10px;
  }
`

Header.Row = Row;
Header.Item = Item;

export default Header;
