import React, { Component } from 'react'
import { connect } from 'react-redux'
import './list.styl'
import { toggleItemStatus, deleteTodoItem, changeItemValue } from '../../redux/actions'

class Item extends Component {
  constructor (props) {
    super(props)
    const { item } = props
    this.state = {
      editing: false,
      editValue: item.value
    }
  }

  toggleItemEditStatus = (item) => {
    const { editValue } = this.state
    const { editInput } = this.refs
    this.setState({
      editing: true
    }, () => {
      editInput.focus()
      editInput.setSelectionRange(editValue.length, editValue.length)
    })
  }

  changeEditValue = (value) => {
    this.setState({
      editValue: value
    })
  }

  onBlurEditInput = (index) => {
    const { changeItemValue } = this.props
    const { editValue } = this.state
    changeItemValue(editValue, index)
    this.setState({
      editing: false
    })
  }

  onEnterItemValue = (keyCode, index) => {
    const { changeItemValue } = this.props
    const { editValue } = this.state
    if (keyCode !== 13) return
    if (!editValue) return
    changeItemValue(editValue, index)
    this.setState({
      editing: false
    })
  }

  render() {
    const { toggleItemEditStatus, changeEditValue, onEnterItemValue, onBlurEditInput } = this
    const { editInput } = this.refs
    const { editing, editValue } = this.state

    const {
      index,
      item,
      currentFilter,
      toggleItemStatus,
      deleteTodoItem
    } = this.props

    let itemClassName = 'item'
    if (item.done) {
      itemClassName += ' done'
    }

    let display = ''
    switch (currentFilter) {
      case 'Active':
        display = item.done ? 'none' : ''
        break
      case 'Done':
        display = !item.done ? 'none' : ''
        break
      default:
        break
    }

    return (
      <li className={itemClassName} style={{ display: display }}>
        <div className="dot" onClick={e => toggleItemStatus(index)}></div>
        <div className="value" onDoubleClick={ e => toggleItemEditStatus() }>
          { item.value }
          <input
            ref="editInput"
            className={ editing ? 'editing' : '' }
            type="text" defaultValue={ item.value }
            onChange={ e => changeEditValue(e.target.value)}
            onBlur={ e => onBlurEditInput(index) }
            onKeyUp={ e => onEnterItemValue(e.keyCode, index)}
          />
        </div>
        <div className="delete" onClick={e => deleteTodoItem(index)}>+</div>
      </li>
    )
  }
}

class List extends Component {

  changeItemValue = (value, index) => {
    let { list, dispatch } = this.props

    list[index].value = value

    dispatch(changeItemValue(list))
  }

  deleteTodoItem = (index) => {
    let { list, dispatch } = this.props

    list.splice(index, 1)

    dispatch(deleteTodoItem(list))
  }

  toggleItemStatus = (index) => {

    let { list, dispatch } = this.props
    let newItem = list[index]

    newItem.done = !newItem.done

    dispatch(toggleItemStatus(list))

  }

  render() {
    const { toggleItemStatus, deleteTodoItem, changeItemValue } = this

    const {
      list,
      currentFilter
    } = this.props

    const item = list.map((item, index) => {
      return (
        <Item key={item.id}
          {...{
            index,
            item,
            currentFilter,
            toggleItemStatus,
            deleteTodoItem,
            changeItemValue
          }}/>
      )
    })

    return (
      <ul className="list-wrap">
        { item }
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(List)