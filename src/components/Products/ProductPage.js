import React, {Component, Fragment} from 'react'
import {Spinner} from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Header from '../Header/Header'
import {selectProduct, submitProductData, validateProductData} from '../../redux/actions/product.actions'
import ProductForm from "./components/ProductForm"
import {isProductChanged, isProductDataReady} from "../../redux/reducers/status.reducers"
import {withRouter} from "react-router-dom"
import {resetProduct} from "../../redux/types/product.types"
import {STATUS_PRODUCT_DATA_NO_PRODUCT} from "../../const/status/ProductStatus"
import ProductsMissing from "./components/ProductMissing"
import {ROUTE_HOME, ROUTE_PRODUCT_PARAM_ID} from "../../const/Commons"

class ProductPage extends Component {
	componentDidMount() {
		const {match} = this.props
		console.log("> componentDidMount: ProductPage -> product = ", match.params[ROUTE_PRODUCT_PARAM_ID])
		this.props.getProductById(match.params[ROUTE_PRODUCT_PARAM_ID])
	}
	
	componentWillUnmount() {
		this.props.resetProduct()
	}
	
	render() {
		const {isReady, isChanged, product, status, errors, categories} = this.props
		
		return (
			<Fragment>
				<Header name="Product" route={ROUTE_HOME} navigation="Back"/>
				{
					status === STATUS_PRODUCT_DATA_NO_PRODUCT
						? <ProductsMissing product={product}/>
						: isReady
							? <ProductForm
								errors={errors}
								status={status}
								product={product}
								categories={categories}
								isChanged={isChanged}
								onSubmit={this.props.submitProductData}
								onValidate={this.props.validateProductData}/>
							: <Spinner/>
				}
			</Fragment>
		)
	}
}

ProductPage.propTypes = {
	product: PropTypes.object,
	categories: PropTypes.array,
	status: PropTypes.number,
	isChanged: PropTypes.bool,
	isReady: PropTypes.bool,
}

const mapStateToProps = (state) => {
	console.log("> mapStateToProps: ProductPage -> \n|\t state.product = ", state.product, "\n|\t state.categories =", state.categories)
	
	return {
		categories: state.categories,
		status: state.status.product,
		product: state.product.data,
		errors: state.product.errors,
		isChanged: isProductChanged(state),
		isReady: isProductDataReady(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		resetProduct: () => dispatch(resetProduct()),
		getProductById: id => dispatch(selectProduct(id)),
		validateProductData: productFormData => dispatch(validateProductData(productFormData)),
		submitProductData: productFormData => dispatch(submitProductData(productFormData)),
	}
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductPage))
