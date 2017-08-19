import React, { Component } from 'react';
import { connect } from 'react-redux'
import './input.styl'
import { addTodo, selectAll } from '../../redux/actions'


class Input extends Component {

  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }
  }

  selectAll = () => {
    let { list, dispatch } = this.props

    const activeList = list.filter(item => {
      return !item.done
    })

    if (!activeList.length) {
      list.forEach(item => {
        item.done = false
      })
    } else {
      list.forEach(item => {
        if (!item.done) {
          item.done = true
        }
      })
    }

    dispatch(selectAll(list))
  }

  changeInputValue = (value) => {
    this.setState({
      inputValue: value
    })
  }

  pushTodoItem = (keyCode) => {
    const { dispatch } = this.props

    if (keyCode !== 13) return
    if (!this.state.inputValue) return
    const item = {
      id: Date.now(),
      done: false,
      value: this.state.inputValue.trim()
    }

    dispatch(addTodo(item))

    this.setState({
      inputValue: ''
    })

  }

  render() {
    const { pushTodoItem, changeInputValue, selectAll } = this

    const { inputValue } = this.state

    const { list } = this.props

    const doneList = list.filter(item => {
      return item.done
    })

    let selectAllClassName = doneList.length === list.length && list.length !== 0 ? 'selectAll all' : 'selectAll'

    return (
      <div className="input-wrap">
        <div
          className={selectAllClassName}
          onClick={ e => selectAll() }
        ></div>
        <input
          className="input"
          type="text"
          placeholder="todolist"
          value={inputValue}
          onKeyDown={ e => pushTodoItem(e.keyCode) }
          onChange={ e => changeInputValue(e.target.value) }
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(Input)