import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.styl';
import PropTypes from 'prop-types'
import Input from './components/input/input.jsx'
import List from './components/list/list.jsx'
import Toolbar from './components/toolbar/toolbar.jsx'

class App extends Component {
  constructor() {
    super()
    this.state = {
      inputValue: '',
      list: [
        {
          id: Date.now(),
          done: false,
          value: '第一项'
        },
        {
          id: Date.now() + 1,
          done: true,
          value: '第二项'
        }
      ],
      currentFilter: 'All',
      filterList: [
        {
          path: '/',
          title: 'All'
        },
        {
          path: '/Active',
          title: 'Active'
        },
        {
          path: '/Done',
          title: 'Done'
        }
      ]
    }
  }

  changeInputValue = (value) => {
    this.setState({
      inputValue: value
    })
  }

  pushTodoItem = (keyCode) => {
    if (keyCode !== 13) return
    if (!this.state.inputValue) return
    const item = {
      id: Date.now(),
      done: false,
      value: this.state.inputValue.trim()
    }

    const list = this.state.list

    list.push(item)

    this.setState({
      list,
      inputValue: ''
    })
  }

  toggleItemStatus = (todoItem) => {
    // question: 应该直接才做该对象好还是遍历好？
    todoItem.done = !todoItem.done
    this.forceUpdate()

    // let { list } = this.state
    // list.filter(item => {
    //   if (item.id === todoItem.id) {
    //     return item.done = !item.done
    //   }
    //   return item
    // })
    // this.setState({
    //   list
    // })

  }

  deleteTodoItem = (todoItem) => {
    let { list } = this.state

    const newList = list.filter(item => {
      return item.id !== todoItem.id
    })
    this.setState({
      list: newList
    })
  }

  clearAllDoneItem = () => {
    let { list } = this.state

    const newList = list.filter(item => {
      return !item.done
    })

    this.setState({
      list: newList
    })
  }

  // changeCurrentFilter = (title) => {
  //   this.setState({
  //     currentFilter: title
  //   })
  // }

  changeItemValue = (value, todoItem) => {
    todoItem.value = value
    todoItem.editing = false
    this.forceUpdate()
  }

  selectAll = () => {
    let { list } = this.state

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

    this.setState({
      list
    })
  }

  render() {
    const {
      inputValue,
      list,
      filterList
      // currentFilter
    } = this.state
    const {
      changeInputValue,
      pushTodoItem,
      toggleItemStatus,
      deleteTodoItem,
      clearAllDoneItem,
      changeCurrentFilter,
      changeItemValue,
      selectAll
    } = this

    return (
      <div id="app" className="app">
        <h1>todos</h1>
        <Input {...{list, changeInputValue, inputValue, pushTodoItem, selectAll}}/>

        {
          filterList.map(item => {
            return (
              <Route key={item.title} path={item.path} exact render={({hostory, match, location}) => {
                if (!location.state) {
                  location.state = {
                    view: item.title
                  }
                }
                const view = location.state.view
                return <List {...{list, view, toggleItemStatus, deleteTodoItem, changeItemValue}}/>
              }}/>
            )
          })
        }

        <Toolbar {...{list, filterList, clearAllDoneItem}}/>
      </div>
    );
  }
}


export default App

