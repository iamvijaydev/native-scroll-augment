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
    this.state = {
      'scroll-to-start': {
        title: 'Scroll to start',
        isHidden: true,
        method: 'scrollToStart',
        hide: ['scroll-to-start', 'scroll-to-start-left', 'scroll-to-start-top'],
        show: ['scroll-to-end', 'scroll-to-end-left', 'scroll-to-end-top']
      },
      'scroll-to-end': {
        title: 'Scroll to end',
        isHidden: false,
        method: 'scrollToEnd',
        hide: ['scroll-to-end', 'scroll-to-end-left', 'scroll-to-end-top'],
        show: ['scroll-to-start', 'scroll-to-start-left', 'scroll-to-start-top']
      },
      'scroll-to-start-left': {
        title: 'Scroll to start left',
        isHidden: true,
        method: 'scrollToStartLeft',
        hide: ['scroll-to-start-left'],
        show: ['scroll-to-end-left']
      },
      'scroll-to-end-left': {
        title: 'Scroll to end left',
        isHidden: false,
        method: 'scrollToEndLeft',
        hide: ['scroll-to-end-left'],
        show: ['scroll-to-start-left']
      },
      'scroll-to-start-top': {
        title: 'Scroll to start top',
        isHidden: true,
        method: 'scrollToStartTop',
        hide: ['scroll-to-start-top'],
        show: ['scroll-to-end-top']
      },
      'scroll-to-end-top': {
        title: 'Scroll to end top',
        isHidden: false,
        method: 'scrollToEndTop',
        hide: ['scroll-to-end-top'],
        show: ['scroll-to-start-top']
      }
    }
  }

  componentDidMount() {
    this.nsa = new NativeScrollAugment({
      parent: this.$parent,
      scrollsAreas: [this.$scrollArea1],
      options: { enableKinetics: true, movingAverage: 0.2 }
    })

    this.nsa.init()

    setTimeout(() => {
      this.nsa.scrollToEnd()
    }, 1000);
  }

  componentWillUnmount() {
    this.nsa.destroy()
  }

  onActionClick(id) {
    if (!this.nsa) {
      return;
    }

    const clickedItem = this.state[id]

    if (!clickedItem) {
      return;
    }

    const {
      method,
      show,
      hide
    } = clickedItem

    this.nsa[method] && this.nsa[method]()

    const withDivider = [...show, '||', ...hide]
    let isHidden = false
    let thatState = {}

    withDivider.forEach(thatId => {
      if (thatId === '||') {
        isHidden = true;
        return;
      }

      thatState = this.state[thatId]
      this.setState({ [thatId]: Object.assign({}, thatState, { isHidden }) })
    })
  }

  generateAction() {
    const keys = Object.keys(this.state)

    return (
      <Actions>
        {
          keys.map((id) => {
            const data = this.state[id];
            const {
              isHidden,
              title
            } = data;

            return (
              <Actions.Item key={id} isHidden={isHidden} onClick={() => this.onActionClick(id)}>
                <Actions.Button>{title}</Actions.Button>
              </Actions.Item>
            )
          })
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
