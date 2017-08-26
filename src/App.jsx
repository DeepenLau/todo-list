import React, { Component } from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'
import './App.styl'
import routes from './router'

class App extends Component {
  render () {
    return (
      <div>
        <div className="navbar">
          <NavLink to="/" className="nav">首页</NavLink>
          <NavLink to="/todo" className="nav">todo</NavLink>
        </div>
        <Switch>
        {
          routes.map(route => {
            return (
              <Route
                exact={route.exact}
                key={route.path}
                path={route.path}
                render={props => (
                  <route.component {...props} routes={route.routes}/>
                )}>
              </Route>
            )
          })
        }
        </Switch>
      </div>
    )
  }
}

export default App