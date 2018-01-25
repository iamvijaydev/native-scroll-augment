import React from 'react'

import Section from './Section'

const fetchComponent = (selectedMenu) => {
  switch (selectedMenu) {
    case 0:
      return import('../Readme')

    case 1:
      return import('../ConnectedScroll/Eg1')

    case 2:
      return import('../ConnectedScroll/Eg2')

    default:
      return new Promise(resolve => resolve());
  }
}

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
    this.loadComponent(this.props.selectedMenu).then(this.updateState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedMenu !== this.state.selectedMenu) {
      this.loadComponent(nextProps.selectedMenu).then(this.updateState);
    }
  }

  loadComponent(selectedMenu) {
    return fetchComponent(selectedMenu)
      .then(ResolvedComponent => ResolvedComponent ? ResolvedComponent.default || ResolvedComponent : null)
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
      isLoading
    } = this.state;

    if (isLoading && Component) {
      return (
        <Section>
          <p>Loading...</p>
          <Component />
        </Section>
      )
    } else if (isLoading && !Component) {
      return (
        <Section>
          <p>Loading...</p>
        </Section>
      )
    } else if (Component) {
      return (
        <Section>
          <Component />
        </Section>
      )
    } else {
      return <Section />
    }
  }
}
