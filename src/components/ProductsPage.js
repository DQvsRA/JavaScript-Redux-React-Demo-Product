import {Button} from "reactstrap"
import {Link} from "react-router-dom"
import React from "react"
import {connect} from "react-redux"
import PropTypes from 'prop-types'
import {buyProductAction} from "../redux/actions/products.actions"
import {STATUS_PRODUCTS_SAVING} from "../consts/status"

const ProductsPage = (props) => {
	return (
		<div className="page page-products">
			<h2>Products Store | <small>Available: {props.available}</small></h2>
			<hr/>
			<Button disabled={props.saving} onClick={props.onBuyProductClick}>Buy product</Button>
			<div><small>Added: {props.oncard}</small></div>
			<hr/>
			<h6>Status: {props.status}</h6>
			<Link to="/card">Go to card</Link>
		</div>
	)
}

ProductsPage.propTypes = {
	oncard: PropTypes.number,
	available: PropTypes.number,
	status: PropTypes.string,
	// dispatch: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
	return {
		onBuyProductClick: () => dispatch(buyProductAction())
	}
}

const mapStateToProps = (state) => {
	return {
		oncard: state.card.items,
		available: state.products.amount,
		status: state.status.status,
		saving: state.status.status === STATUS_PRODUCTS_SAVING,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage)
