import React, { Component } from 'react';
import './input.styl'

export default class Input extends Component {
  render() {
    const { list, changeInputValue, inputValue, pushTodoItem, selectAll } = this.props

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