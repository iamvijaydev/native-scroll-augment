import React from 'react'

import Section from './Section'

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

  fetchReadMe() {
    return import('../Readme')
  }
  fetchConnectedScrollEg1() {
    return import('../ConnectedScrollEg1')
  }

  fetchComponent(selectedMenu) {
    switch (selectedMenu) {
      case 0:
        return this.fetchReadMe();
      
      case 1:
        return this.fetchConnectedScrollEg1();
    
      default:
        return new Promise(resolve => resolve());
    }
  }

  loadComponent(selectedMenu) {
    return this.fetchComponent(selectedMenu)
      .then(ResolvedComponent => ResolvedComponent.default || ResolvedComponent)
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
