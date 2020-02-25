import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter, Route, Switch} from "react-router-dom"
import {Provider} from "react-redux"
import store from "./redux/store"
import ProductsPage from "./components/ProductsPage"
import CardPage from "./components/CardPage"
import AnotherComponent from "./components/AnotherComponent"

const App = () => {
  return (
    <div className="content">
      <div className="container">
        <Provider store={store}>
          <HashRouter>
            <Switch>
              <Route exact path="/" render={() =>
                <React.Fragment>
                  <ProductsPage/>
                  <AnotherComponent/>
                </React.Fragment>
              }/>
              <Route path="/card" component={CardPage}/>
              <Route path="*" render={() => (<h1>Not Found</h1>)}/>,
            </Switch>
          </HashRouter>
        </Provider>
      </div>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
