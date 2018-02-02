import React from 'react'

import NativeScrollAugment from '../../../../dist'
import Parent from '../shared/Parent'
import Grid from '../shared/Grid'
import ActionPortal from './ActionPortal'
import Actions from './Actions'

const GridExd = Grid.extend`
  left: 0;
  top: 0;
`

export default class ExposedMethodsEg1 extends React.Component {
  static generateData() {
    const xArray = Array.from({ length: 30 }, (e, i) => i)
    const yArray = Array.from({ length: 20 }, (e, i) => i)

    const gridData = [];
    let gridRowData;

    yArray.forEach((ye, yi) => {
      gridRowData = [];
      xArray.forEach((xe, xi) => {
        gridRowData.push(yi % 3 === 0 ? <Grid.ItemActive key={xi} /> : <Grid.Item key={xi} />)
      })

      gridData.push(
        <Grid.Row key={yi}>{gridRowData}</Grid.Row>
      )
    })

    return gridData
  }

  constructor(props) {
    super(props);
    this.$conatinerParent = document.querySelector('#container');
    this.state = { actionData: [] }
  }

  componentWillMount() {
    if (this.props.selectedMenu === 'load-exposed-methods-eg-1') {
      this.setState({
        actionData: [{
          id: 'scroll-to-start',
          title: 'Scroll to start',
          isHidden: true,
          hide: [0, 2, 4],
          show: [1, 3, 5]
        }, {
          id: 'scroll-to-end',
          title: 'Scroll to end',
          isHidden: false,
          hide: [1, 3, 5],
          show: [0, 2, 4]
        }, {
          id: 'scroll-to-start-left',
          title: 'Scroll to start left',
          isHidden: true,
          hide: [2],
          show: [3]
        }, {
          id: 'scroll-to-end-left',
          title: 'Scroll to end left',
          isHidden: false,
          hide: [3],
          show: [2]
        }, {
          id: 'scroll-to-start-top',
          title: 'Scroll to start top',
          isHidden: true,
          hide: [4],
          show: [5]
        }, {
          id: 'scroll-to-end-top',
          title: 'Scroll to end top',
          isHidden: false,
          hide: [5],
          show: [4]
        }]
      })
    }
  }

  componentDidMount() {
    this.nsa = new NativeScrollAugment({
      parent: this.$parent,
      scrollsAreas: [this.$scrollArea1],
      options: { enableKinetics: true, movingAverage: 0.2 }
    })

    this.nsa.init()
  }

  componentWillUnmount() {
    this.nsa.destroy()
  }

  onActionClick(index) {
    if (!this.nsa) {
      return;
    }

    const clickedItem = this.state.actionData[index]

    if (!clickedItem) {
      return;
    }

    const {
      id,
      show,
      hide
    } = clickedItem
    let method;

    switch (id) {
      case 'scroll-to-start':
        method = 'scrollToStart'
        break;

      case 'scroll-to-end':
        method = 'scrollToEnd'
        break;

      case 'scroll-to-start-left':
        method = 'scrollToStartLeft'
        break;

      case 'scroll-to-end-left':
        method = 'scrollToEndLeft'
        break;

      case 'scroll-to-start-top':
        method = 'scrollToStartTop'
        break;

      case 'scroll-to-end-top':
        method = 'scrollToEndTop'
        break;
    
      default:
        break;
    }

    this.nsa[method] && this.nsa[method]()

    const actionData = [...this.state.actionData]

    show.forEach(index => actionData[index].isHidden = false)
    hide.forEach(index => actionData[index].isHidden = true)
    this.setState({ actionData })
  }

  generateAction() {
    return (
      <Actions>
        {
          this.state.actionData.map(({ id, title, isHidden }, index) => (
            <Actions.Item key={id} isHidden={isHidden} onClick={() => this.onActionClick(index)}>
              <Actions.Button>{title}</Actions.Button>
            </Actions.Item>
          ))
        }
      </Actions>
    )
  }

  render() {
    return (
      <Parent innerRef={(node) => { this.$parent = node }}>
        <GridExd innerRef={(node) => { this.$scrollArea1 = node }}>{ExposedMethodsEg1.generateData()}</GridExd>
        <ActionPortal>{this.generateAction()}</ActionPortal>
      </Parent>
    )
  }
}
