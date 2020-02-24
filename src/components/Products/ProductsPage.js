import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter} from "react-router-dom"
import Header from '../Header/Header'
import ProductsList from './components/ProductsList'
import ProductModalDelete from "./components/ProductModalDelete"
import { fetchCategories } from '../../redux/actions/categories.actions'
import {fetchProducts} from '../../redux/actions/products.actions'

import { getCategoriesById } from '../../redux/reducers/categories.reducers'
import {
  isApplicationDataReady,
  getApplicationDataStatus,
  isCategoriesDataReady, isProductsDataReady
} from '../../redux/reducers/status.reducers'
import {getProductsWithCategoriesNames} from "../../redux/reducers/products.reducers"
import {STATUS_MODAL_SHOW_DELETE_REQUEST} from "../../const/status/ModalsStatus"
import ProductsNotReady from "./components/ProductsNotReady"
import {ROUTE_PRODUCT, ROUTE_PRODUCT_ADD} from "../../const/Commons"

class ProductsPage extends Component {
  static defaultProps = {
    isReady: false,
    products: null
  }
  
  componentDidMount() {
    this.props.prepare()
  }

  render() {
    const {products, status, isReady, modals} = this.props
    
    return (
        <Fragment>
          <Header name="Products List" route={ROUTE_PRODUCT + ROUTE_PRODUCT_ADD} navigation="Add Product"/>
          {
            isReady
            ? <ProductsList data={products}/>
            : <ProductsNotReady status={status}/>
          }
          {modals > 0 && renderModal(modals)}
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

ProductsPage.propTypes = {
  isReady: PropTypes.bool,
  status: PropTypes.number,
  modals: PropTypes.number,
  products: PropTypes.array,
}

const mapStateToProps = (state) => {
  const status = getApplicationDataStatus(state)
  const isReady = isApplicationDataReady(status)
  if (!isReady) return { status }

  const modals = state.status.modals
  // console.log("> mapStateToProps: ProductsPage -> modals = ", modals)
  console.log("> mapStateToProps: ProductsPage -> state = ", state)

  const categoriesById = getCategoriesById(state.categories)
  const products = getProductsWithCategoriesNames(state.products, categoriesById)

  return {
    products,
    modals,
    status,
    isReady
  }
}

const mapDispatchToProps = dispatch => {
  return {
    prepare: () => dispatch((dispatch, getState) => {
      const status = getApplicationDataStatus(getState())
      const isReady = isApplicationDataReady(status)
      if (!isReady) {
        isCategoriesDataReady(getState())
          || dispatch(fetchCategories())
        isProductsDataReady(getState())
          || dispatch(fetchProducts())
      }
    }),
  }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsPage))
