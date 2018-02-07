import React from 'react'
import marked from 'marked'

import readme from '../../../../README.md'
import Parent from '../shared/Parent'
import Article from './Article'

export default class ReadMe extends React.Component {

  createMarkup() {
    return { __html: marked(readme) };
  }

  render() {
    return (
      <Parent>
        <Article ref={(node) => { this.$parent = node }} dangerouslySetInnerHTML={this.createMarkup()} />
      </Parent>
    )
  }
}
