import React from 'react'
import PropTypes from 'prop-types'
import {Button, ButtonGroup} from 'reactstrap'
import {Link} from "react-router-dom"
import {inject, observer} from "mobx-react"

const LINK_STYLE = {color: 'inherit', textDecoration: 'inherit'}

const ProductActions = ({pid, onDelete}) => {
	let path = "/product/" + pid
	return (
		<ButtonGroup className="product-actions">
			<Button color="info" outline={true}><Link style={LINK_STYLE} to={path}>Edit</Link></Button>
			<Button color="danger" outline={true} onClick={() => onDelete(pid)}>Delete</Button>
		</ButtonGroup>
	)
}

ProductActions.propTypes = {
  pid: PropTypes.number.isRequired,
}

export default inject(({store}) => ({
	onDelete: store.requestDeleteProductById
}))
(observer(ProductActions))
