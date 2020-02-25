import {Link} from "react-router-dom"
import React from "react"
import {connect} from "react-redux"

export const CardPage = (props) => {
	return (
		<div className="page page-card">
			<h2>Card</h2>
			<p>Products to buy amount: {props.items}</p>
			<Link to="/">Go back</Link>
		</div>
	)
}

export default connect((state) => {
	return {
		items: state.card.items
	}
})(CardPage)
