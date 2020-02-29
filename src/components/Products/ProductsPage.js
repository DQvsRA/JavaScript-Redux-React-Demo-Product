import React, { Component, Fragment } from 'react'
import Header from '../Header/Header'
import ProductsList from './components/ProductsList'
import ProductModalDelete from "./components/ProductModalDelete"
import {STATUS_MODAL_SHOW_DELETE_REQUEST} from "../../const/status/ModalsStatus"
import ProductsNotReady from "./components/ProductsNotReady"
import {ROUTE_PRODUCT, ROUTE_PRODUCT_ADD} from "../../const/Commons"
import {observer, inject} from 'mobx-react'
import {connect} from "react-redux"
import * as ApplicationActions from "../../mobx/actions"

class ProductsPage extends Component {
  componentDidMount() {
    console.log("componentDidMount")
    this.props.loadApplicationData()
  }
  
  render() {
    const {isReady} = this.props
    return (
      <Fragment>
        <Header name="Products List" route={ROUTE_PRODUCT + ROUTE_PRODUCT_ADD} navigation="Add Product"/>
        {
          isReady
          //   && <ProductsList list={store.products.list}/>
          //   || <ProductsNotReady status={store.status}/>
        }
        {/*{store.modals.status > 0 && renderModal(store.modals.status)}*/}
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

const mapStateToProps = state => {
  return {
    isReady: state.isApplicationDataReady,
    status: state.status
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadApplicationData: () => dispatch(ApplicationActions.loadApplicationData)
  // actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage)

// export default inject('store')(observer(ProductsPage))
