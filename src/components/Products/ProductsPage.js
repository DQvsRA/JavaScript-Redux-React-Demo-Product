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
    this.props.loadData()
  }
  
  render() {
    const {
      isApplicationDataReady,
      applicationStatus,
      productsList,
      showModal,
      modal,
    } = this.props
    return (
      <Fragment>
        <Header name="Products List" route={ROUTE_PRODUCT + ROUTE_PRODUCT_ADD} navigation="Add Product"/>
        {
          isApplicationDataReady
            && <ProductsList list={productsList}/>
            || <ProductsNotReady status={applicationStatus}/>
        }
        {showModal && renderModal(modal)}
      </Fragment>
  )
  }
}

function renderModal(modal) {
  switch (modal) {
    case STATUS_MODAL_SHOW_DELETE_REQUEST:
      return <ProductModalDelete/>
    default: return null
  }
}

export default inject(({store}) => ({
  isApplicationDataReady: store.isApplicationDataReady,
  applicationStatus: store.status,
  productsList: store.products.data,
  showModal: store.modals.showModal,
  modal: store.modals.status,
  /* actions */
  loadData: store.loadApplicationData
}))(observer(ProductsPage))
