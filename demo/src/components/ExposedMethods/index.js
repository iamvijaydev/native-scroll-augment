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

export default class ExposedMethods extends React.Component {
  static generateData() {
    const xArray = Array.from({ length: 30 }, (e, i) => i)
    const yArray = Array.from({ length: 30 }, (e, i) => i)

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
      eg1MetaKeys: ['scroll-to-start', 'scroll-to-end', 'scroll-to-start-left', 'scroll-to-end-left', 'scroll-to-start-top', 'scroll-to-end-top'],
      eg2MetaKeys: ['scroll-to-position-left', 'scroll-to-position-top', 'scroll-to-position', 'scroll-by-value-left', 'scroll-by-value-top', 'scroll-by-value'],
      selectedDataSet: 'eg1MetaKeys',
      /* eg 1 data */
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
      },
      /* eg 2 data */
      'scroll-to-position-left': 100,
      'scroll-to-position-top': 100,
      'scroll-to-position': {
        title: 'Scroll to position',
        method: 'scrollToPosition',
      },
      'scroll-by-value-left': 100,
      'scroll-by-value-top': 100,
      'scroll-by-value': {
        title: 'Scroll by value',
        method: 'scrollByValue',
      }
    }

    this.onChange = this.onChange.bind(this)
  }

  componentWillMount() {
    this.setStateData(this.props.selectedMenu, '')
  }
  componentWillReceiveProps(nextProps) {
    this.setStateData(nextProps.selectedMenu, this.props.selectedMenu)
  }

  setStateData(selectedMenu, previousValue) {
    if (selectedMenu === previousValue) {
      return;
    }
    
    if ('load-exposed-methods-eg-1' === selectedMenu) {
      this.setState({
        selectedDataSet: 'eg1MetaKeys'
      })
    } else if ('load-exposed-methods-eg-2' === selectedMenu) {
      this.setState({
        selectedDataSet: 'eg2MetaKeys',
        'scroll-to-position-left': 100,
        'scroll-to-position-top': 100,
        'scroll-to-value-left': 100,
        'scroll-to-value-top': 100,
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

    const clickedItem = this.state[id]

    if (!clickedItem) {
      return;
    }

    const {
      method,
      show,
      hide
    } = clickedItem

    if (this.nsa[method]) {
      let left;
      let top;

      if ('scroll-to-position' === id) {
        left = this.state['scroll-to-position-left'];
        top = this.state['scroll-to-position-top'];
      } else if ('scroll-by-value' === id) {
        left = this.state['scroll-by-value-left'];
        top = this.state['scroll-by-value-top'];
      }

      if (left, top) {
        this.nsa[method](left, top)
      } else {
        this.nsa[method]()
      }
    }

    if (!!show && !!hide) {

      /*
        copy this.state.data, since we are gonna change it to the entire
      */

      const withDivider = [].concat(show, '||', hide)
      const changes = {}
      let isHidden = false

      withDivider.forEach((otherId) => {
        if (otherId === '||') {
          isHidden = true;
          return;
        }

        changes[otherId] = Object.assign(
          {},
          this.state[otherId],
          { isHidden }
        )
      })

      if (Object.keys(changes).length) {
        this.setState(changes)
      }
    }
  }

  onChange(e) {
    const {
      id,
      value
    } = e.target;

    if (!!id) {
      this.setState({
        [id]: value
      })
    }
  }

  generateAction() {
    const { selectedMenu } = this.props
    const keys = this.state[this.state.selectedDataSet]

    const disableButton = (id) => {
      if ('scroll-to-position' === id) {
        return !this.state['scroll-to-position-left'] || !this.state['scroll-to-position-top']
      }

      if ('scroll-by-value' === id) {
        return !this.state['scroll-by-value-left'] || !this.state['scroll-by-value-top']
      }

      return false
    }
    const formItems = {
      'scroll-to-position-left': true,
      'scroll-to-position-top': true,
      'scroll-by-value-left': true,
      'scroll-by-value-top': true
    }
    const roundEdgeUIFormItems = {
      'scroll-to-position-left': true,
      'scroll-by-value-left': true,
    }
    const formBtns = {
      'scroll-to-position': true,
      'scroll-by-value': true
    }
    const getItem = (id, title) => {
      if (!!formItems[id]) {
        return <Actions.Input
          type="text"
          title={`Enter ${id.split('-')[3]} value`}
          title={`${id.split('-')[3]}`}
          id={id}
          value={this.state[id]}
          onChange={this.onChange}
          roundEdge={!!roundEdgeUIFormItems[id]}
        />
      } else {
        return <Actions.Button onClick={() => this.onActionClick(id)} disabled={disableButton(id)} isFormBtn={!!formBtns[id]}>{title}</Actions.Button>
      }
    }

    return (
      <Actions>
        {
          keys.map((id) => {
            const data = this.state[id];
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
        <GridExd innerRef={(node) => { this.$scrollArea1 = node }}>{ExposedMethods.generateData()}</GridExd>
        <ActionPortal>{this.generateAction()}</ActionPortal>
      </Parent>
    )
  }
}
