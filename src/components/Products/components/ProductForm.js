import React from 'react'
import ReactDOM from "react-dom"
import {
	Input, FormGroup, Label, Col, Form, Button, FormFeedback
} from 'reactstrap'
import {
	CATEGORIES_SELECTED_MAX,
	CATEGORIES_SELECTED_MIN, TEXT_MAX_NAME_CHAR,
	RATING_MAX,
	TEXT_RATING_AUTO_FEATURE, NAME_MAX_CHARACTERS, DATE_FORMAT_SHORT, DATE_FORMAT_LONG
} from "../../../const/Commons"
import {inject, observer} from "mobx-react"
import {formatDate, getMaxExpirationDate} from "../../../utils/dateFormatter"

const LEFT_COLUMN_SIZE = 2
const RIGHT_COLUMN_SIZE = 12 - LEFT_COLUMN_SIZE

const ProductForm = (props) => {
	const formRef = React.createRef();
	
	const onChange = (e) => {
		const form = ReactDOM.findDOMNode(formRef.current)
		props.validateProductFormData(new FormData(form))
	}
	
	const onSubmit = (e) => {
		e.preventDefault()
		const form = ReactDOM.findDOMNode(formRef.current)
		props.submitProductFormData(new FormData(form))
	}
	
	return (
			<Form key={props.id} autoComplete="off" ref={formRef} onSubmit={onSubmit} onChange={onChange}>
				<FormGroup row>
					<Label for="name" sm={LEFT_COLUMN_SIZE}>Name:</Label>
					<Col sm={RIGHT_COLUMN_SIZE}>
						<Input defaultValue={props.name} invalid={props.isNameInvalid} maxLength={NAME_MAX_CHARACTERS} type="text" name="name" placeholder={TEXT_MAX_NAME_CHAR}/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="brand" sm={LEFT_COLUMN_SIZE}>Brand:</Label>
					<Col sm={RIGHT_COLUMN_SIZE}>
						<Input defaultValue={props.brand} type="text" name="brand"/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="brand" sm={LEFT_COLUMN_SIZE}>Items In Stock:</Label>
					<Col sm={RIGHT_COLUMN_SIZE}>
						<Input defaultValue={props.itemsInStock} type="number" name="itemsInStock" placeholder="number"/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="frmRating" sm={LEFT_COLUMN_SIZE}>Rating:</Label>
					<Col sm={RIGHT_COLUMN_SIZE}>
						<Input type="select" defaultValue={props.rating} name="rating" id="frmRating">
							{[...Array(RATING_MAX)].map((_, i) => <option value={++i} key={i}>{i}</option>)}
						</Input>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Col sm={{size: RIGHT_COLUMN_SIZE, offset: LEFT_COLUMN_SIZE}}>
						<FormGroup check>
							<Label for="frmFeatured">
								<Input key={props.isDefaultFeatured} id="frmFeatured" defaultChecked={props.isDefaultFeatured}
								       type="checkbox" name="featured" disabled={props.isAutoFeatured}/>
								{TEXT_RATING_AUTO_FEATURE}
							</Label>
						</FormGroup>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="frmCategories" sm={LEFT_COLUMN_SIZE}>Categories</Label>
					<Col sm={RIGHT_COLUMN_SIZE}>
						<Input invalid={props.isCategoriesInvalid} type="select" defaultValue={props.categories}
									 name="categories" id="frmCategories" multiple>
							{props.categoriesNames.map(c => (<option value={c.id} key={c.id}>{c.name}</option>))}
						</Input>
						<FormFeedback tooltip>{props.categories.length} selected, but must select
							from {CATEGORIES_SELECTED_MIN} to max {CATEGORIES_SELECTED_MAX} categories</FormFeedback>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="brand" sm={LEFT_COLUMN_SIZE}>Receipt Date:</Label>
					<Col sm={RIGHT_COLUMN_SIZE}>
						<Input defaultValue={formatDate(props.receiptDate, DATE_FORMAT_SHORT)} type="date" name="receiptDate" placeholder="date"/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="expirationDate" sm={LEFT_COLUMN_SIZE}>Expiration Date:</Label>
					<Col sm={RIGHT_COLUMN_SIZE}>
						<Input min={formatDate(props.createdAt, DATE_FORMAT_SHORT)}
						       defaultValue={formatDate(props.expirationDate, DATE_FORMAT_SHORT)}
						       max={getMaxExpirationDate()} id="expirationDate"
						       type="date" name="expirationDate" placeholder="date"/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="createdAt" sm={LEFT_COLUMN_SIZE}>Created At:</Label>
					<Col sm={RIGHT_COLUMN_SIZE}>
						<Input defaultValue={formatDate(props.createdAt, DATE_FORMAT_SHORT)}
						       type="datetime" id="createdAt" name="createdAt" placeholder="date" disabled/>
					</Col>
				</FormGroup>
				<Button type="submit" color="info" outline size="lg"
				        disabled={props.isSavePossible}
								block>{props.isEditing ? "Save" : "Add"}
				</Button>
			</Form>
	)
}

export default inject(({store}) => ({
	...store.selected.product,
	
	isAutoFeatured: store.selected.isAutoFeatured,
	isDefaultFeatured: store.selected.isDefaultFeatured,
	isCategoriesInvalid: store.selected.isCategoriesInvalid,
	isNameInvalid: store.selected.isNameInvalid,
	isSavePossible: store.selected.isSavePossible,
	isEditing: store.selected.isEditing,
	
	categoriesNames: store.categories.data,
	
	/* actions */
	validateProductFormData: store.selected.validateProductFormData,
	submitProductFormData: store.selected.submitProductFormData,
}))(observer(ProductForm))
