import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import {
  BrowserRouter as Router
} from 'react-router-dom'

import App from './App.jsx'
import todoApp from './redux/reducers'

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

let store = createStore(todoApp, composeWithDevTools())

render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.getElementById('root')
)
