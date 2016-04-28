import 'babel-polyfill'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { fetchIntents, fetchEntities } from './common/actions'
import voiceUIApp from './common/reducers'
import App from './common/App'

const loggerMiddleware = createLogger()

const store = createStore(
  voiceUIApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

store.dispatch(fetchIntents())
store.dispatch(fetchEntities())