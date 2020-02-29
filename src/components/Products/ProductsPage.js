import React, { Component, Fragment } from 'react'
import Header from '../Header/Header'
import ProductsList from './components/ProductsList'
import ProductModalDelete from "./components/ProductModalDelete"
import {STATUS_MODAL_SHOW_DELETE_REQUEST} from "../../const/status/ModalsStatus"
import ProductsNotReady from "./components/ProductsNotReady"
import {ROUTE_PRODUCT, ROUTE_PRODUCT_ADD} from "../../const/Commons"
import {observer, inject} from 'mobx-react'

class ProductsPage extends Component {
  componentDidMount() {
    const {store} = this.props
    store.loadApplicationData()
  }
  
  render() {
    const {store} = this.props
    return (
      <Fragment>
        <Header name="Products List" route={ROUTE_PRODUCT + ROUTE_PRODUCT_ADD} navigation="Add Product"/>
        {
          store.isApplicationDataReady
            && <ProductsList list={store.products.list}/>
            || <ProductsNotReady status={store.status}/>
        }
        {store.modals.status > 0 && renderModal(store.modals.status)}
      </Fragment>
  )
  }
}

function renderModal(status) {
  switch (status) {
    case STATUS_MODAL_SHOW_DELETE_REQUEST:
      return <ProductModalDelete/>
    default: return null
  }
}

export default inject('store')(observer(ProductsPage))
