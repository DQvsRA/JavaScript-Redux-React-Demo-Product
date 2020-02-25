import React from 'react';
import {Button} from "reactstrap"
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {buyProductAction} from "../redux/products.actions"
import {buyProduct, setStatus, STATUS_PURCHASE_NO_PRODUCTS} from "../redux/products.store"

class ProductsStore extends React.Component {
	render() {
		return (
			<React.Fragment>
				<h2>Product Store | Available: {this.props.available}</h2>
				<hr/>
				{/*<Button onClick={()=>this.props.buyProduct(this.props.available)}>Buy product</Button>*/}
				<Button onClick={()=>this.props.buyProduct()}>Buy product</Button>
				<div><small>On card: {this.props.oncard}</small></div>
				<hr/>
				<h6>Status: {this.props.status}</h6>
			</React.Fragment>
		)
	}
}

ProductsStore.propTypes = {
	oncard: PropTypes.number.isRequired,
	available: PropTypes.number.isRequired,
	status: PropTypes.string,
}

const mapStateToProps = (state) => {
	return {
		oncard: state.card.items,
		available: state.products.amount,
		status: state.status.value
	}
}

const mapDispatchToProps = dispatch => {
	return {
		buyProduct: () => {
			dispatch(buyProductAction())
		},
		// buyProduct: (amountInStore) => {
		// 	if (amountInStore > 0)
		// 		dispatch(buyProduct())
		// 	else
		// 		dispatch(setStatus(STATUS_PURCHASE_NO_PRODUCTS))
		// },
	}
}

// const buyProductAction = () => (dispatch, getState) => {
// 	if (getState().products.amount > 0) {
// 		dispatch(buyProduct())
// 	} else {
// 		dispatch(setStatus(STATUS_PURCHASE_NO_PRODUCTS))
// 	}
// }

// export default ProductsStore
export default connect(mapStateToProps, mapDispatchToProps)(ProductsStore)
