/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {connect} from "react-redux"
import {cancelDeleteProduct, confirmDeleteProduct} from "../../../redux/actions/products.actions"
import ProductCard from "./ProductCard"
import {getCategoriesById} from "../../../redux/reducers/categories.reducers"
import {setProductCategoriesNames} from "../../../redux/reducers/products.reducers"

class ProductModalDelete extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: true,
			delete: false
		}
		this.onClosed = this.onClosed.bind(this)
		this.onConfirm = this.onConfirm.bind(this)
		this.onCancel = this.onCancel.bind(this)
	}
	
	onConfirm(e) {
		this.setState({
      delete: true,
      visible: false
		})
	}
	
	onCancel(e) {
		this.setState({
		  delete: false,
		  visible: false
		})
	}
	
	onClosed() {
		if (this.state.delete) {
			this.props.confirmDeleteProduct()
		} else {
			this.props.cancelDeleteProduct()
		}
	}
	
	render() {
		
		const {product} = this.props
		
		return (
			<div>
				<Modal isOpen={this.state.visible} onClosed={this.onClosed}>
					<ModalHeader><b>Confirm delete product</b></ModalHeader>
					<ModalBody>
						<ProductCard product={product} no_actions={true}/>
					</ModalBody>
					<ModalFooter>
						<Button color="danger" onClick={this.onConfirm}>Confirm Delete</Button>{' '}
						<Button color="secondary" onClick={this.onCancel}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</div>
		)
	}
}

ProductModalDelete.propTypes = {
	product: PropTypes.object,
}

const mapStateToProps = (state) => {
	const categoriesById = getCategoriesById(state.categories)
	const product = setProductCategoriesNames(state.product.data, categoriesById)
	return { product }
}

const mapDispatchToProps = dispatch => {
	return {
		confirmDeleteProduct: () => dispatch(confirmDeleteProduct()),
		cancelDeleteProduct: () => dispatch(cancelDeleteProduct()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductModalDelete)