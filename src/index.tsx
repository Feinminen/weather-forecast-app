import React from 'react'

import ReactDOM from 'react-dom'
import { Redirect, Route, Switch, HashRouter } from 'react-router-dom'

import './index.scss'
import { App } from './containers/App'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Switch>
        <Route exact path={'/:location?'} component={App} />
        <Redirect to={'/'} />
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
