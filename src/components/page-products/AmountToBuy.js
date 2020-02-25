import {Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap"
import React from "react"
import {connect} from "react-redux"
import {setBuyAmount} from "../../redux/actions/products.actions"


const AmountToBuy = (props) => {
	return (
		<InputGroup>
			<InputGroupAddon addonType="prepend">
				<InputGroupText>Amount to buy</InputGroupText>
			</InputGroupAddon>
			<Input key={props.maxValue} type="number"
			       onChange={(e) => props.setBuyAmount(e.target.value)}
			       defaultValue={props.defaultValue}
			       max={props.maxValue}
			       min={props.minValue}
			/>
		</InputGroup>
	)
}

function mapStateToProps(state) {
	return {
		maxValue: state.products.amount,
		minValue: state.products.amount > 1 ? 1 : 0,
		defaultValue: state.products.buyAmount,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setBuyAmount: (value) => dispatch(setBuyAmount(value)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AmountToBuy)