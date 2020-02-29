import React from 'react'
import PropTypes from 'prop-types'
import {Button, ButtonGroup} from 'reactstrap'
import {Link} from "react-router-dom"
import {inject, observer} from "mobx-react"

const ProductActions = ({pid, store}) => {
	let path = "/product/" + pid
	let linkStyle = {color: 'inherit', textDecoration: 'inherit'}
	return (
		<ButtonGroup className="product-actions">
			<Button color="info" outline={true}><Link style={linkStyle} to={path}>Edit</Link></Button>
			<Button color="danger" outline={true} onClick={() => store.requestDeleteProductById(pid)}>Delete</Button>
		</ButtonGroup>
	)
}

ProductActions.propTypes = {
  pid: PropTypes.number.isRequired,
}

export default inject('store')(observer(ProductActions))
