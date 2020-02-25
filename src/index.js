import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ConnectedRouter } from 'connected-react-router'
import {Provider} from "react-redux"
import store from "./redux/store"
import { history } from "./redux/store"
import Routes from "./routes"

const App = () => {
  return (
    <div className="content">
      <div className="container">
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Routes/>
          </ConnectedRouter>
        </Provider>
      </div>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
