import React, {Component, Fragment} from 'react'
import {Spinner} from 'reactstrap'
import Header from '../Header/Header'
import ProductForm from "./components/ProductForm"
import ProductsMissing from "./components/ProductMissing"
import {ROUTE_HOME, ROUTE_PRODUCT, ROUTE_PRODUCT_PARAM_ID} from "../../const/Commons"
import {inject, observer} from "mobx-react"

class ProductPage extends Component {
	componentDidMount() {
		const {match, history, store} = this.props
		let routeId = match.params[ROUTE_PRODUCT_PARAM_ID]
		store.listenHistoryChangesOnRoute(history, ROUTE_PRODUCT)
		store.selectProductFromRouteId(routeId)
	}
	
	render() {
		const {store} = this.props
		return (
			<Fragment>
				<Header name="Product" route={ROUTE_HOME} navigation="Back"/>
				{
					store.selected.noProductData
						? <ProductsMissing pid={store.selected.routeId}/>
						:	store.isSelectedProductDataReady
							? <ProductForm/> : <Spinner/>
				}
			</Fragment>
		)
	}
}

export default inject('store')(observer(ProductPage))
