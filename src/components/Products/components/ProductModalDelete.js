/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, {Component} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ProductCard from "./ProductCard"
import {inject, observer} from "mobx-react"

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
		const {store} = this.props
		this.state.delete
			&& store.confirmDeleteProduct()
			|| store.cancelDeleteProduct()
	}
	
	render() {
		const {store} = this.props
		return (
			<div>
				<Modal isOpen={this.state.visible} onClosed={this.onClosed}>
					<ModalHeader><b>Confirm delete product</b></ModalHeader>
					<ModalBody>
						<ProductCard id={store.selected.product.id} no_actions={true}/>
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

export default inject('store')(observer(ProductModalDelete))
