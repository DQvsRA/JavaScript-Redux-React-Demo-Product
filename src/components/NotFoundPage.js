import React from "react"
import {connect} from "react-redux"
import {navigateAction} from "../redux/actions/navigator.actions"
import {NAVIGATE_BACK} from "../consts/navigator"

export const NotFoundPage = (props) => {
	return (
		<div className="page page-card">
			<h1>Not found</h1>
			<a href="#" onClick={props.onGoBackClick}>Go back</a>
		</div>
	)
}

export default connect(null,
	(dispatch) => {
		return {
			onGoBackClick: () => dispatch(navigateAction(NAVIGATE_BACK))
		}
	}
)(NotFoundPage)
