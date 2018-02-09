import React from 'react'
import ReactDOM from 'react-dom'

const $conatinerParent = document.querySelector('#container');

export default class ActionPortal extends React.Component {
  constructor(props) {
    super(props);
    this.$el = document.createElement('div');
  }

  componentDidMount() {
    $conatinerParent.appendChild(this.$el);
  }

  componentWillUnmount() {
    $conatinerParent.removeChild(this.$el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.$el
    );
  }
}
