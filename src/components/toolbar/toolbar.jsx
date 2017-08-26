import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './toolbar.styl'
import { clearAllDoneItem, changeCurrentFilter } from '../../redux/actions'

class FilterItem extends Component {

  render() {
    let {
      item,
      location
    } = this.props

    return (
      <NavLink to={item.path}>
        <span className={location.pathname===item.path ? 'active' : ''}>
          { item.filter }
        </span>
      </NavLink>
    )
  }
}

const FilterItemWithRouter = withRouter(FilterItem)

class Toolbar extends Component {
  clearAllDoneItem = () => {
    let { list, dispatch } = this.props

    const newList = list.filter(item => {
      return !item.done
    })

    dispatch(clearAllDoneItem(newList))
  }

  render() {
    let { clearAllDoneItem, changeCurrentFilter } = this

    let { list, routes } = this.props

    const activeList = list.filter(item => {
      return !item.done
    })

    const activeLeftNum = activeList.length

    const filterListBtn = routes.map(item => {
      return (
        <FilterItemWithRouter
          key={item.filter}
          {...{item}}/>
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