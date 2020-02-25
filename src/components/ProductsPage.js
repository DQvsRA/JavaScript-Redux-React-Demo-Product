import {Button} from "reactstrap"
import React from "react"
import {connect} from "react-redux"
import PropTypes from 'prop-types'
import {buyProductAction} from "../redux/actions/products.actions"
import {STATUS_PRODUCTS_NO_PRODUCTS, STATUS_PRODUCTS_SAVING} from "../consts/status"
import AmountToBuy from "./page-products/AmountToBuy"
import {navigateAction} from "../redux/actions/navigator.actions"
import {NAVIGATE_TO_CARD} from "../consts/navigator"

const ProductsPage = (props) => {
	return (
		<div className="page page-products">
			<h2>Products Store | <small>Available: {props.available}</small></h2>
			<h6 style={{color:"grey"}}>Status: {props.status}</h6>
			<hr/>
			<AmountToBuy/>
			<hr/>
			<Button color="primary" size="lg" block disabled={props.isBuyDisabled} onClick={props.onBuyProductClick}>Buy product</Button>
			<hr/>
			<div><big>Added: {props.oncard}</big></div>
			<a href="#" onClick={props.onGoToCardClick}>Go to card</a>
			<hr/>
		</div>
	)
}

ProductsPage.propTypes = {
	oncard: PropTypes.number,
	available: PropTypes.number,
	status: PropTypes.string,
}

const mapDispatchToProps = (dispatch) => {
	return {
		onBuyProductClick: () => dispatch(buyProductAction()),
		onGoToCardClick: () => dispatch(navigateAction(NAVIGATE_TO_CARD))
	}
}

const mapStateToProps = (state) => {
	return {
		oncard: state.card.items,
		available: state.products.amount,
		status: state.status.status,
		isBuyDisabled: (state.status.status === STATUS_PRODUCTS_SAVING
			|| state.status.status === STATUS_PRODUCTS_NO_PRODUCTS),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage)
