import {connect} from "react-redux"
import React from "react"
import {Jumbotron} from "reactstrap"

const AnotherComponent = (props) => {
	return (
		<Jumbotron>
			<h3 style={{color:"lightgrey"}}>Another component: {props.available}</h3>
		</Jumbotron>
	)
}

export default connect(
	(state) => {
		return {available: state.products.amount}
	})(AnotherComponent)