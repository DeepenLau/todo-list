import React, { Component } from 'react'
import { connect } from 'react-redux'
import { test } from './redux/actions'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.styl';
import PropTypes from 'prop-types'
import Input from './components/input/input.jsx'
import List from './components/list/list.jsx'
import Toolbar from './components/toolbar/toolbar.jsx'

class App extends Component {

  render() {

    const { list } = this.props

    return (
      <div id="app" className="app">
        <h1>todos</h1>
        <Input/>
        <List/>
        <Toolbar/>
      </div>
    )
  }
}

// 这里是用来在组件中取出部分你想要的数据，然后 connect 给组件的 props
function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(App)

