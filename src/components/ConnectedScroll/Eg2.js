import React from 'react'

import NativeScrollAugment from '../../../../dist'
import Parent from '../shared/Parent'
import Grid from '../shared/Grid'
import Sidebar from './Eg2.Sidebar'
import Header from './Eg2.Header'

const GridExd = Grid.extend`
  left: 200px;
  top: 62px;  
`

export default class ConnectedScrollEg2 extends React.Component {
  static generateData() {
    const xArray = Array.from({ length: 30 }, (e, i) => i)
    const yArray = Array.from({ length: 20 }, (e, i) => i)

    const sidebarData = [];
    const headerRowData = [];
    const gridData = [];
    let gridRowData;

    yArray.forEach((ye, yi) => {
      sidebarData.push(yi % 3 === 0 ? <Sidebar.ItemActive key={yi} /> : <Sidebar.Item key={yi} />)

      gridRowData = [];
      xArray.forEach((xe, xi) => {
        gridRowData.push(yi % 3 === 0 ? <Grid.ItemActive key={xi} /> : <Grid.Item key={xi} />)

        if (yi === 0) {
          headerRowData.push(<Header.Item key={xi} />)
        }
      })

      gridData.push(
        <Grid.Row key={yi}>{gridRowData}</Grid.Row>
      )
    })

    return {
      sidebarData,
      headerData: <Header.Row>{headerRowData}</Header.Row>,
      gridData
    }

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
      scrollsAreas: [this.$scrollArea1, this.$scrollArea2, this.$scrollArea3],
      options: { enableKinetics: true, movingAverage: 0.2 }
    })

    this.nsa.init()
  }

  componentWillUnmount() {
    this.nsa.destroy()
  }

  render() {
    const {
      sidebarData,
      headerData,
      gridData
    } = ConnectedScrollEg2.generateData()

    return (
      <Parent innerRef={(node) => { this.$parent = node }}>
        <Sidebar innerRef={(node) => { this.$scrollArea1 = node }}>
          <Sidebar.List>
            {sidebarData}
          </Sidebar.List>
        </Sidebar>
        <Header innerRef={(node) => { this.$scrollArea2 = node }}>{headerData}</Header>
        <GridExd innerRef={(node) => { this.$scrollArea3 = node }}>{gridData}</GridExd>
      </Parent>
    )
  }
}
