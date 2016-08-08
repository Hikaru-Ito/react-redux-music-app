import React from 'react'
import ReactDOM from 'react-dom'

import './styles/main.scss'

import { configureStore } from './store/configureStore'
import { Root } from './containers/Root'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

let state = window.__initialState__ || undefined
const store = configureStore(browserHistory, state)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
