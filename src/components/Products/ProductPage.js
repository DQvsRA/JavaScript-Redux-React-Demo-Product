import React, {Component, Fragment} from 'react'
import {Spinner} from 'reactstrap'
import Header from '../Header/Header'
import ProductForm from "./components/ProductForm"
import ProductsMissing from "./components/ProductMissing"
import {ROUTE_HOME, ROUTE_PRODUCT, ROUTE_PRODUCT_PARAM_ID} from "../../const/Commons"
import {inject, observer} from "mobx-react"

class ProductPage extends Component {
	componentDidMount() {
		const {
			match, history,
			listenHistoryChangesOnRoute,
			selectProductFromRouteId
		} = this.props
		let routeId = match.params[ROUTE_PRODUCT_PARAM_ID]
		listenHistoryChangesOnRoute(history, ROUTE_PRODUCT)
		selectProductFromRouteId(routeId)
	}
	
	render() {
		const {
			isProductReady,
			isProductMissing
		} = this.props
		
		return (
			<Fragment>
				<Header name="Product" route={ROUTE_HOME} navigation="Back"/>
				{
					isProductMissing
						? <ProductsMissing pid={this.props.pid}/>
						:	isProductReady ? <ProductForm/> : <Spinner/>
				}
			</Fragment>
		)
	}
}

export default inject(({store}) => ({
	isProductMissing: store.selected.isProductMissing,
	isProductReady: store.isSelectedProductDataReady,
	pid: store.selected.routeId,
	
	/* actions */
	listenHistoryChangesOnRoute: store.listenHistoryChangesOnRoute,
	selectProductFromRouteId: store.selectProductFromRouteId,
}))(observer(ProductPage))
