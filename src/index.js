import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ConnectedRouter } from 'connected-react-router'
import {Provider} from "react-redux"
import {Provider as MProvider} from "mobx-react"
import store from "./redux/store"
import { history } from "./redux/store"
import Routes from "./routes"
import RootStore from "./mobx/store"

const rootStore = new RootStore()

const App = () => {
  return (
    <div className="content">
      <div className="container">
        <MProvider rootStore={rootStore}>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <Routes/>
            </ConnectedRouter>
          </Provider>
        </MProvider>
      </div>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
