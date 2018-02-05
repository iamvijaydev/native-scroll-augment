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
      data: {}
    }

    this.onChange = this.onChange.bind(this)
  }

  componentWillMount() {
    this.setStateData(this.props.selectedMenu)
  }
  componentWillReceiveProps({ selectedMenu }) {
    this.setStateData(selectedMenu)
  }

  setStateData(selectedMenu) {
    if ('load-exposed-methods-eg-1' === selectedMenu) {
      this.setState({
        data: {
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
      })
    } else if ('load-exposed-methods-eg-2' === selectedMenu) {
      this.setState({
        data: {
          'scroll-to-position-left': 0,
          'scroll-to-position-top': 0,
          'scroll-to-position': {
            title: 'Scroll to position',
            method: 'scrollToPosition',
          },
          'scroll-to-value-left': 0,
          'scroll-to-value-top': 0,
          'scroll-by-value': {
            title: 'Scroll by value',
            method: 'scrollByValue',
          }
        }
      })
    }

    this.nsa && this.nsa.scrollToStart()
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

  onActionClick(id) {
    if (!this.nsa) {
      return;
    }

    const clickedItem = this.state.data[id]

    if (!clickedItem) {
      return;
    }

    const {
      method,
      show,
      hide
    } = clickedItem

    this.nsa[method] && this.nsa[method](this.state.data['scroll-to-position-left'], this.state.data['scroll-to-position-top'])

    if (this.nsa[method]) {
      let left;
      let top;

      if ('scroll-to-position' === id) {
        left = this.state.data['scroll-to-position-left'];
        top = this.state.data['scroll-to-position-top'];
      } else if ('scroll-by-value' === id) {
        left = this.state.data['scroll-by-value-left'];
        top = this.state.data['scroll-by-value-top'];
      }

      if (left, top) {
        this.nsa[method](left, top)
      } else {
        this.nsa[method]()
      }
    }

    if (!!show && !!hide) {
      const withDivider = [].concat(show, '||', hide)
      let isHidden = false
      let thatState = {}
  
      withDivider.forEach(thatId => {
        if (thatId === '||') {
          isHidden = true;
          return;
        }
  
        thatState = this.state.data[thatId]
        this.setState({
          data: Object.assign({}, this.state.data, { [thatId]: Object.assign({}, thatState, { isHidden }) })
        })
      })
    }
  }

  onChange(e) {
    const {
      id,
      value
    } = e.target;

    this.setState({
      data: Object.assign({}, this.state.data, { [id]: value })
    })
  }

  generateAction() {
    const { selectedMenu } = this.props
    const keys = Object.keys(this.state.data)
    const isInput = () => true

    const formItems = {
      'scroll-to-position-left': true,
      'scroll-to-position-top': true,
      'scroll-to-value-left': true,
      'scroll-to-value-top': true
    }
    const getItem = (id, title) => {
      if (!!formItems[id]) {
        return <Actions.Input type="number" id={id} value={this.state.data[id]} onChange={this.onChange} />
      } else {
        return <Actions.Button onClick={() => this.onActionClick(id)}>{title}</Actions.Button>
      }
    }

    return (
      <Actions>
        {
          keys.map((id) => {
            const data = this.state.data[id];
            const isHidden = typeof data === typeof {} ? data.isHidden : false
            const title = typeof data === typeof {} ? data.title : ''

            return (
              <Actions.Item key={id} isHidden={isHidden} isInput={!!formItems[id]}>{getItem(id, title)}</Actions.Item>
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
