import React from 'react'
import NativeScrollAugment from '../../../../dist'
import Parent from '../shared/Parent'
import Area from '../shared/Area'

const ParentExd = Parent.extend`
  display: flex;
`

export default class ConnectedScrollEg2 extends React.Component {
  static generateData() {
    return (
      <Area.Content>
        {
          Array(20).map((d, i) => <Area.Item key={i} />)
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
    <ParentExd ref={((node) => { this.$parent = ref })}>
      <Area ref={((node) => { this.$scrollArea1 = ref })}>{ConnectedScrollEg1.generateData()}</Area>
      <Area ref={((node) => { this.$scrollArea2 = ref })}>{ConnectedScrollEg1.generateData()}</Area>
    </ParentExd>
  }
}
