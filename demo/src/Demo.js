import React from 'react'

import App from './components/App'
import Menu from './components/Menu'
import Container from './components/Container'

export default class Demo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      menus: [{
        id: 'read-me',
        name: 'Read Me'
      }, {
        id: 'load-connect-scroll-eg-1',
        name: 'Connected Scroll eg. 1'
      }, {
        id: 'load-connect-scroll-eg-2',
        name: 'Connected Scroll eg. 2'
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

    this.onMenuChange = this.onMenuChange.bind(this)
  }

  onMenuChange(selectedMenu) {
    this.setState({ selectedMenu })
  }

  render() {
    const {
      menus,
      selectedMenu
    } = this.state;

    return (
      <App>
        <Menu menus={menus} selectedMenu={selectedMenu} onMenuChange={this.onMenuChange} />
        <Container menus={menus} selectedMenu={selectedMenu} />
      </App>
    )
  }
}
