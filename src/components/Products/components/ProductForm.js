import React from 'react'
import ReactDOM from "react-dom"
import {
	Input, FormGroup, Label, Col, Form, Button, FormFeedback
} from 'reactstrap'
import {
	CATEGORIES_SELECTED_MAX,
	CATEGORIES_SELECTED_MIN, TEXT_MAX_NAME_CHAR,
	RATING_MAX,
	TEXT_RATING_AUTO_FEATURE, NAME_MAX_CHARACTERS
} from "../../../const/Commons"
import {inject, observer} from "mobx-react"

const ProductForm = (props) => {
	const {store} = props

	const selected = store.selected
	const categories = store.categories.data
	
	const product = selected.product
	const createdAt = store.getProductCreatedDate(product)

	const leftColumn = 2
	const rightColumn = 12 - leftColumn

	const autoFeatured = selected.isAutoFeatured
	const defaultFeatured = selected.isDefaultFeatured
	
	const formRef = React.createRef();
	
	const onChange = (e) => {
		const form = ReactDOM.findDOMNode(formRef.current)
		selected.validateProductFormData(new FormData(form))
	}
	
	const onSubmit = (e) => {
		e.preventDefault()
		const form = ReactDOM.findDOMNode(formRef.current)
		selected.submitProductFormData(new FormData(form))
	}
	
	return (
			<Form key={product.id} autoComplete="off" ref={formRef} onSubmit={onSubmit} onChange={onChange}>
				<FormGroup row>
					<Label for="name" sm={leftColumn}>Name:</Label>
					<Col sm={rightColumn}>
						<Input defaultValue={product.name} invalid={selected.isNameInvalid} maxLength={NAME_MAX_CHARACTERS} type="text" name="name" placeholder={TEXT_MAX_NAME_CHAR}/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="brand" sm={leftColumn}>Brand:</Label>
					<Col sm={rightColumn}>
						<Input defaultValue={product.brand} type="text" name="brand"/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="brand" sm={leftColumn}>Items In Stock:</Label>
					<Col sm={rightColumn}>
						<Input defaultValue={product.itemsInStock} type="number" name="itemsInStock" placeholder="number"/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="frmRating" sm={leftColumn}>Rating:</Label>
					<Col sm={rightColumn}>
						<Input type="select" defaultValue={product.rating} name="rating" id="frmRating">
							{[...Array(RATING_MAX)].map((_, i) => <option value={++i} key={i}>{i}</option>)}
						</Input>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Col sm={{size: rightColumn, offset: leftColumn}}>
						<FormGroup check>
							<Label for="frmFeatured">
								<Input key={defaultFeatured} id="frmFeatured" defaultChecked={defaultFeatured}
								       type="checkbox" name="featured" disabled={autoFeatured}/>
								{TEXT_RATING_AUTO_FEATURE}
							</Label>
						</FormGroup>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="frmCategories" sm={leftColumn}>Categories</Label>
					<Col sm={rightColumn}>
						<Input invalid={selected.isCategoriesInvalid} type="select" defaultValue={product.categories}
									 name="categories" id="frmCategories" multiple>
							{categories.map(c => (<option value={c.id} key={c.id}>{c.name}</option>))}
						</Input>
						<FormFeedback tooltip>{product.categories.length} selected, but must select
							from {CATEGORIES_SELECTED_MIN} to max {CATEGORIES_SELECTED_MAX} categories</FormFeedback>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="brand" sm={leftColumn}>Receipt Date:</Label>
					<Col sm={rightColumn}>
						<Input defaultValue={store.getProductReceiptDate(product)} type="date" name="receiptDate" placeholder="date"/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="expirationDate" sm={leftColumn}>Expiration Date:</Label>
					<Col sm={rightColumn}>
						<Input min={createdAt}
						       defaultValue={store.getProductExpirationDate(product)}
						       max={store.getProductMaxExpirationDate()} id="expirationDate"
									 type="date" name="expirationDate" placeholder="date"/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="createdAt" sm={leftColumn}>Created At:</Label>
					<Col sm={rightColumn}>
						<Input defaultValue={createdAt} type="date" id="createdAt" name="createdAt" placeholder="date" disabled/>
					</Col>
				</FormGroup>
				<Button type="submit" color="info" outline size="lg"
				        disabled={selected.isSavePossible}
								block>{selected.isEditing ? "Save" : "Add"}
				</Button>
			</Form>
	)
}

export default inject('store')(observer(ProductForm))
