import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

const logger = createLogger()

module.exports = function configureStore(history, initialState = {}) {

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        logger,
        thunkMiddleware,
        routerMiddleware(history)
      )
    )
  )

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    )
  }

  return store
}
