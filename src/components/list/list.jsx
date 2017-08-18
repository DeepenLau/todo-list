import React, { Component } from 'react'
import './list.styl'

class List extends Component {
  render() {
    const {
      list,
      toggleItemStatus,
      deleteTodoItem,
      changeItemValue,
      view
    } = this.props

    const item = list.map((item, index) => {
      return (
        <Item
          key={item.id}
          {...{
            item,
            toggleItemStatus,
            deleteTodoItem,
            changeItemValue,
            view
          }}/>)
    })

    return (
      <ul className="list-wrap">
        {item}
      </ul>
    )
  }
}

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

  onBlurEditInput = (item) => {
    const { changeItemValue } = this.props
    const { editValue } = this.state
    changeItemValue(editValue, item)
    this.setState({
      editing: false
    })
  }

  onEnterItemValue = (keyCode, item) => {
    const { changeItemValue } = this.props
    const { editValue } = this.state
    if (keyCode !== 13) return
    if (!editValue) return
    changeItemValue(editValue, item)
    this.setState({
      editing: false
    })
  }

  render() {
    const { toggleItemEditStatus, changeEditValue, onEnterItemValue, onBlurEditInput } = this
    const { editInput } = this.refs
    const { editing, editValue } = this.state

    const {
      item,
      toggleItemStatus,
      deleteTodoItem,
      // changeItemValue
      view
    } = this.props

    let itemClassName = 'item'
    if (item.done) {
      itemClassName += ' done'
    }

    let display = ''
    switch (view) {
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
        <div className="dot" onClick={e => toggleItemStatus(item)}></div>
        <div className="value" onDoubleClick={ e => toggleItemEditStatus() }>
          { item.value }
          <input
            ref="editInput"
            className={ editing ? 'editing' : '' }
            type="text" defaultValue={ item.value }
            onChange={ e => changeEditValue(e.target.value)}
            onBlur={ e => onBlurEditInput(item) }
            onKeyUp={ e => onEnterItemValue(e.keyCode, item)}
          />
        </div>
        <div className="delete" onClick={e => deleteTodoItem(item)}>+</div>
      </li>
    )
  }
}

export default List