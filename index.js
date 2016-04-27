import 'babel-polyfill'
import thunkMiddleware from 'redux-thunk'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import voiceUIApp from './common/reducers'
import App from './common/App'

let store = createStore(
  voiceUIApp,
  applyMiddleware(
    thunkMiddleware
  )
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)