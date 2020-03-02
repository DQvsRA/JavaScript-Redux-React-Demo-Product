import React, {Component} from 'react'
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import {
	Input, FormGroup, Label, Col, Form, Button, FormFeedback
} from 'reactstrap'
import {
	ERROR_PRODUCT_FORM_NAME_REQUIRED,
	ERROR_PRODUCT_FORM_CATEGORIES_MAX_REACHED,
	ERROR_PRODUCT_FORM_CATEGORIES_NO_MIN, ERROR_PRODUCT_FORM_NAME_EXCEED_LENGTH
} from "../../../const/errors/ProductFormErrors"
import {
	CATEGORIES_SELECTED_MAX,
	CATEGORIES_SELECTED_MIN,
	NAME_MAX_CHARACTERS, NAME_MIN_CHARACTERS,
	RATING_MAX,
	RATING_TO_TRIGGER_AUTO_FEATURE
} from "../../../const/Commons"
import {STATUS_PRODUCT_DATA_READY_EDIT} from "../../../const/status/ProductStatus"
import {expirationDateMax, formatDate} from "../../../utils/dateUtils"
import {isProductChanged} from "../../../redux/reducers/status.reducers"
import {submitProductData, validateProductData} from "../../../redux/actions/product.actions"
import {connect} from "react-redux"

const shortDateFormat = 'YYYY-MM-DD'

class ProductForm extends Component {
	constructor(props) {
		super(props)
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onChange(e) {
		const form = ReactDOM.findDOMNode(this.refs.form)
		this.props.onValidate(new FormData(form))
	}

	onSubmit(e) {
		e.preventDefault()
		const node = ReactDOM.findDOMNode(this.refs.form)
		this.props.onSubmit(new FormData(node))
	}

	componentDidMount() {
	}

	render() {
		const {product, categories, errors, isEdit, isChanged} = this.props

		const hasErrors = errors.length > 0
		
		const receiptDate = formatDate(product.receiptDate, shortDateFormat)
		const expirationDate = formatDate(product.expirationDate, shortDateFormat)
		const dateMax = expirationDateMax(shortDateFormat)
		const createdAt = formatDate(product.createdAt, shortDateFormat)

		const leftColumn = 2
		const rightColumn = 12 - leftColumn

		const nameInvalid = hasErrors && (errors.indexOf(ERROR_PRODUCT_FORM_NAME_REQUIRED) >= 0 || errors.indexOf(ERROR_PRODUCT_FORM_NAME_EXCEED_LENGTH) >= 0)
		const categoriesInvalid = hasErrors && (errors.indexOf(ERROR_PRODUCT_FORM_CATEGORIES_NO_MIN) >= 0 || errors.indexOf(ERROR_PRODUCT_FORM_CATEGORIES_MAX_REACHED) >= 0)
		
		const autoFeatured = product.autoFeatured
		const featured = product.featured
		
		const defaultFeatured = featured || autoFeatured
		
		console.log("featured | autoFeatured | defaultFeatured", featured, autoFeatured, defaultFeatured)
		
		const MAX_NAME_CHAR = NAME_MIN_CHARACTERS + " required and not more than " + NAME_MAX_CHARACTERS + " characters"

		return (
				<Form key={product.id} autoComplete="off" ref="form" onSubmit={this.onSubmit} onChange={this.onChange}>
					<FormGroup row>
						<Label for="name" sm={leftColumn}>Name:</Label>
						<Col sm={rightColumn}>
							<Input defaultValue={product.name} invalid={nameInvalid} type="text" name="name"
										 placeholder={MAX_NAME_CHAR}/>
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
							<Input defaultValue={product.itemsInStock} type="number" name="itemsInStock"
										 placeholder="number"/>
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
									Featured (rating greater then {RATING_TO_TRIGGER_AUTO_FEATURE} automatically make product featured)
								</Label>
							</FormGroup>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="frmCategories" sm={leftColumn}>Categories</Label>
						<Col sm={rightColumn}>
							<Input invalid={categoriesInvalid} type="select" defaultValue={product.categories}
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
							<Input defaultValue={receiptDate} type="date" name="receiptDate" placeholder="date"/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="expirationDate" sm={leftColumn}>Expiration Date:</Label>
						<Col sm={rightColumn}>
							<Input min={createdAt} defaultValue={expirationDate} max={dateMax} id="expirationDate"
										 type="date" name="expirationDate" placeholder="date"/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="createdAt" sm={leftColumn}>Created At:</Label>
						<Col sm={rightColumn}>
							<Input defaultValue={createdAt} type="date" id="createdAt" name="createdAt" placeholder="date"
										 disabled/>
						</Col>
					</FormGroup>
					<Button type="submit" disabled={hasErrors || !isChanged} color="info" outline size="lg"
									block>{isEdit ? "Save" : "Add"}</Button>
				</Form>
		)
	}
}

ProductForm.propTypes = {
	errors: PropTypes.array.isRequired,
	product: PropTypes.object.isRequired,
	isChanged: PropTypes.bool.isRequired,
	isEdit: PropTypes.bool.isRequired,
	categories: PropTypes.array.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onValidate: PropTypes.func.isRequired,
}


const mapStateToProps = (state) => {
	return {
		errors: state.product.errors,
		product: state.product.data,
		isEdit: state.status.product === STATUS_PRODUCT_DATA_READY_EDIT,
		isChanged: isProductChanged(state),
		categories: state.categories,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onValidate: productFormData => dispatch(validateProductData(productFormData)),
		onSubmit: productFormData => dispatch(submitProductData(productFormData)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductForm)