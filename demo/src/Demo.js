import React from 'react'

import { Menu } from './components/Menu'
import { Container } from './components/Container'

export class Demo extends React.Component {
  state: {
    menus: [{
      id: 'read-me',
      name: 'Read Me'
    }, {
        id: 'load-connect-scroll-eg-1',
        name: 'Connected Scroll eg. 1'
      }, {
        id: 'load-connect-scroll-eg-2',
        name: 'Connected Scroll eg. 2
      }, {
        id: 'load-kinetic-scroll',
        name: 'Kinetic Scroll'
      }, {
        id: 'load-exposed-methods-eg-1',
        name: 'Exposed Methods eg. 1'
      }, {
        id: 'load-exposed-methods-eg-2',
        name: 'Exposed Methods eg. 2'
      }],
      selectedMenu: 0
  }

  onMenuChange = (selectedMenu) => {
    this.setState({ selectedMenu })
  }

  render() {
    const {
      mens,
      selectedMenu
    } = this.state;

    return (
      <span>
        <Menu menus={menus} selectedMenu={selectedMenu} onMenuChange={this.onMenuChange} />
        <Container menus={menus} selectedMenu={selectedMenu} />
      </span>
    )
  }
}
