import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import ProductsPage from './components/Products/ProductsPage'
import ProductPage from './components/Products/ProductPage'
import NotFoundPage from './components/NotFound/NotFoundPage'
import {ROUTE_HOME, ROUTE_PRODUCT, ROUTE_PRODUCT_PARAM_ID} from "./const/Commons"

export function getRoutes() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path={ROUTE_HOME} component={ProductsPage}/>,
        {/*<Route path={ROUTE_PRODUCT + ":" + ROUTE_PRODUCT_PARAM_ID} component={ProductPage}/>,*/}
        <Route path="*" component={NotFoundPage}/>,
      </Switch>
    </HashRouter >
  )
}

export default getRoutes
