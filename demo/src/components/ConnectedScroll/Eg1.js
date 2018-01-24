import React from 'react'
import NativeScrollAugment from '../../../../dist'
import Parent from '../shared/Parent'
import Area from '../shared/Area'

const ParentExd = Parent.extend`
  display: flex;
`

export default class ConnectedScrollEg1 extends React.Component {
  static generateData() {
    return (
      <Area.Content>
        {
          Array
            .from({ length: 100 }, (v, i) => i)
            .map((d, i) => <Area.Item key={i} />)
        }
      </Area.Content>
    )
  }

  componentDidMount() {
    this.nsa = new NativeScrollAugment({
      parent: this.$parent,
      scrollsAreas: [this.$scrollArea1, this.$scrollArea2],
      options: { enableKinetics: true, movingAverage: 0.2 }
    })

    this.nsa.init()
  }

  componentWillUnmount() {
    this.nsa.destroy()
  }

  render() {
    return (
      <ParentExd innerRef={(node) => { this.$parent = node }}>
        <Area innerRef={(node) => { this.$scrollArea1 = node }}>{ConnectedScrollEg1.generateData()}</Area>
        <Area innerRef={(node) => { this.$scrollArea2 = node }}>{ConnectedScrollEg1.generateData()}</Area>
      </ParentExd>
    )
  }
}
