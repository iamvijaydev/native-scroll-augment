import styled from 'styled-components'

const Area = styled.div`
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
`

const Content = styled.ul`
  display: inline-block;
  margin: 0;
  padding: 0;
  width: 100%;
  list-style: none;
`

const Item = styled.li`
  padding: 3rem 0;
  height: 3rem;
  position: relative;
  
  &:not(:last-child) {
    border-bottom: 1px solid #eaeaea;
  }

  &:before,
  &:after {
    content: ' ';
    position: absolute;
    top: 3.3rem;
    height: 2.5rem;
    background: #eaeaea
  }

  &:before {
    left: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
  }

  &:after {
    left: 75px;
    right: 2.5rem;
    border-radius: 1rem;
  }
`

Area.Content = Content
Area.Item = Item

export default Area
