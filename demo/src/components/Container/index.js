import React from 'react'

import asyncLoader from './asyncLoader'
import Section from './Section'
import Loader from './Loader'

export default class Container extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      Component: null,
      isLoading: true
    }

    this.updateState = this.updateState.bind(this)
  }

  componentWillMount() {
    asyncLoader(this.props.selectedMenu).then(this.updateState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedMenu !== this.props.selectedMenu) {
      this.setState({ isLoading: true });
      setTimeout(() => {
        asyncLoader(nextProps.selectedMenu).then(this.updateState);
      }, 300);
    }
  }

  updateState(Component) {
    this.setState({
      Component,
      isLoading: false
    })
  }

  render() {
    const {
      Component,
      isLoading,
    } = this.state;
    const {
      selectedMenu
    } = this.props

    const loadOrMsg = isLoading ? <p>Loading component...</p> : <p>Failed to load component. Try again?</p>
    const comp = Component ? <Component selectedMenu={selectedMenu} /> : loadOrMsg
    const loading = isLoading ? <Loader /> : null

    return (
      <Section id="container">
        {loading}
        {comp}
      </Section>
    )
  }
}
