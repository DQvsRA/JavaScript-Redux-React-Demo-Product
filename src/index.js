import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import ReactNotification from 'react-notifications-component'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import getRoutes from './routes'
import reducers from "./redux/reducers"

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-notifications-component/dist/theme.css'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
  <div>
    <ReactNotification />
    <div className="container">
      <Provider store={store}>
        {getRoutes()}
      </Provider>
    </div>
  </div>,
  document.getElementById('root')
)
