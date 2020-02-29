import React from 'react'
import ReactDOM from 'react-dom'
import ReactNotification from 'react-notifications-component'
import { Provider } from 'mobx-react'
import getRoutes from './routes'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-notifications-component/dist/theme.css'
import store from "./mobx/store"
import makeInspectable from 'mobx-devtools-mst';

const mStore = store.create()
makeInspectable(mStore);

ReactDOM.render(
  <div>
    <ReactNotification />
    <div className="container">
        <Provider store={mStore}>
          {getRoutes()}
        </Provider>
    </div>
  </div>,
  document.getElementById('root')
)
