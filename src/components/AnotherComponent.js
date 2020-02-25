import {connect} from "react-redux"
import React from "react"

export default connect(
	(state) => {
		return {available: state.products.amount}
	})
((props) => {
	return <h3>Another component: {props.available}</h3>
})