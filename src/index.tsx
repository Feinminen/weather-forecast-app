import React from 'react'

import ReactDOM from 'react-dom'
import { Redirect, Route, Switch, Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import './index.scss'
import { App } from './containers/App'

const history = createBrowserHistory()

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Switch>
        <Route exact path={'/:location?'} component={App} />
        <Redirect to={'/'} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
