import React, {Component, Fragment} from 'react'
import {Spinner} from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Header from '../Header/Header'
import {selectProduct, } from '../../redux/actions/product.actions'
import ProductForm from "./components/ProductForm"
import {isProductDataReady} from "../../redux/reducers/status.reducers"
import {withRouter} from "react-router-dom"
import {resetProduct} from "../../redux/types/product.types"
import {STATUS_PRODUCT_DATA_NO_PRODUCT} from "../../const/status/ProductStatus"
import ProductsMissing from "./components/ProductMissing"
import {ROUTE_HOME, ROUTE_PRODUCT, ROUTE_PRODUCT_PARAM_ID} from "../../const/Commons"
import {listenHistoryChangesOnRoute} from "../../redux/reducers/products.reducers"

class ProductPage extends Component {
	componentDidMount() {
		const {match, history} = this.props
		const routeId = match.params[ROUTE_PRODUCT_PARAM_ID]
		console.log("> componentDidMount: ProductPage -> product = ", match.params[ROUTE_PRODUCT_PARAM_ID])
		this.props.listenHistory(history, ROUTE_PRODUCT)
		this.props.getProductById(routeId)
	}
	
	componentWillUnmount() {
		this.props.resetProduct()
	}
	
	render() {
		const {isReady, status } = this.props
		
		return (
			<Fragment>
				<Header name="Product" route={ROUTE_HOME} navigation="Back"/>
				{
					status === STATUS_PRODUCT_DATA_NO_PRODUCT
						? <ProductsMissing/>
						: isReady
							? <ProductForm/>
							: <Spinner/>
				}
			</Fragment>
		)
	}
}

ProductPage.propTypes = {
	status: PropTypes.number,
	isReady: PropTypes.bool,
}

const mapStateToProps = (state) => {
	console.log("> mapStateToProps: ProductPage -> \n|\t state.product = ", state.product,
		"\n|\t state.status.product =", state.status.product,
		"\n|\t state.categories =", state.categories)
	
	return {
		status: state.status.product,
		isReady: isProductDataReady(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		resetProduct: () => dispatch(resetProduct()),
		getProductById: id => dispatch(selectProduct(id)),
		listenHistory: (history, route) => dispatch(listenHistoryChangesOnRoute(history, route))
	}
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductPage))
