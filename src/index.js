import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductsStore from "./components/ProductsStore"
import {Provider} from "react-redux"
import store from "./redux/products.store"

ReactDOM.render(
  <div className="content">
    <div className="container">
      <Provider store={store}>
        <ProductsStore/>
      </Provider>
    </div>
  </div>,
  document.getElementById('root')
);
