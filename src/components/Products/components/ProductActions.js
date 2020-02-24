import React from 'react'
import PropTypes from 'prop-types'
import {Button, ButtonGroup} from 'reactstrap'
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {requestDeleteProduct} from "../../../redux/actions/products.actions"

const ProductActions = ({pid, onDelete}) => {
	let path = "/product/" + pid
	let linkStyle = {color: 'inherit', textDecoration: 'inherit'}
	return (
		<ButtonGroup className="product-actions">
			<Button color="info" outline={true}><Link style={linkStyle} to={path}>Edit</Link></Button>
			<Button color="danger" outline={true} onClick={() => onDelete(pid)}>Delete</Button>
		</ButtonGroup>
	)
}

ProductActions.propTypes = {
  pid: PropTypes.number.isRequired,
}

const mapDispatchToProps = dispatch => {
  return {
    onDelete: (pid) => dispatch(requestDeleteProduct(pid)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ProductActions)
