import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import './toolbar.styl'

class FilterItem extends Component {

  render() {
    let {
      item,
      match,
      location,
      history
    } = this.props



    if (!location.state) {
      location.state = {
        view : item.title
      }
    }

    return (
      <span className={location.state.view===item.title ? 'active' : ''}
        onClick={ e => {
          history.push(item.path, {
            view: item.title
          })
        }}>
        { item.title }
      </span>
    )
  }
}

const FilterItemWithRouter = withRouter(FilterItem)

class Toolbar extends Component {
  render() {
    let { list, clearAllDoneItem, filterList, location } = this.props

    const activeList = list.filter(item => {
      return !item.done
    })

    const activeLeftNum = activeList.length

    const filterListBtn = filterList.map(item => {
      return (
        <FilterItemWithRouter
          key={item.title}
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

export default withRouter(Toolbar)