import React, { Component } from 'react';
import { connect } from 'react-redux'
import './toolbar.styl'
import { clearAllDoneItem, changeCurrentFilter } from '../../redux/actions'

class FilterItem extends Component {

  render() {
    let {
      item,
      currentFilter,
      changeCurrentFilter
    } = this.props

    return (
      <span className={currentFilter===item.title ? 'active' : ''}
        onClick={ e => changeCurrentFilter(item.title)}>
        { item.title }
      </span>
    )
  }
}

class Toolbar extends Component {
  constructor() {
    super()
    this.state = {
      filterList: [
        { title: 'All' },
        { title: 'Active' },
        { title: 'Done' }
      ]
    }
  }

  clearAllDoneItem = () => {
    let { list, dispatch } = this.props

    const newList = list.filter(item => {
      return !item.done
    })

    dispatch(clearAllDoneItem(newList))
  }

  changeCurrentFilter = (filter) => {
    let { currentFilter, dispatch } = this.props

    currentFilter = filter

    dispatch(changeCurrentFilter(currentFilter))
  }

  render() {
    let { clearAllDoneItem, changeCurrentFilter } = this

    let { list, currentFilter } = this.props

    let { filterList } = this.state

    const activeList = list.filter(item => {
      return !item.done
    })

    const activeLeftNum = activeList.length

    const filterListBtn = filterList.map(item => {
      return (
        <FilterItem
          key={item.title}
          {...{item, currentFilter, changeCurrentFilter}}/>
        )
    })
    return (
      <div className="toolbar">
        <div>{activeLeftNum} item{ activeLeftNum > 1 ? 's' : '' } left</div>
        <div className="filter">
          {filterListBtn}
        </div>
        <div
          className="clear"
          style={ { display: activeLeftNum >= list.length ? 'none' : null}  }
          onClick={e => clearAllDoneItem()}>
          Clear all done
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}

export default connect(mapStateToProps)(Toolbar)