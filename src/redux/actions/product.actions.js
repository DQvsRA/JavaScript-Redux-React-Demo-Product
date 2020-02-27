import {isCategoriesDataReady, isProductsDataReady} from "../reducers/status.reducers"
import {fetchCategories} from "./categories.actions"
import {
	ERROR_PRODUCT_FORM_CATEGORIES_MAX_REACHED,
	ERROR_PRODUCT_FORM_CATEGORIES_NO_MIN,
	ERROR_PRODUCT_FORM_NAME_EXCEED_LENGTH,
	ERROR_PRODUCT_FORM_NAME_REQUIRED,
} from "../../const/errors/ProductFormErrors"
import {
	CATEGORIES_SELECTED_MAX,
	CATEGORIES_SELECTED_MIN,
	NAME_MAX_CHARACTERS,
	NAME_MIN_CHARACTERS,
	RATING_TO_TRIGGER_AUTO_FEATURE,
	ROUTE_PRODUCT_ADD
} from "../../const/Commons"
import {addUpdateProduct} from "../types/products.types"
import {productDataVerifyErrors, setProduct} from "../types/product.types"
import {fetchProducts} from "./products.actions"
import ProductVO from "../../vos/ProductVO"
import ProductNotFoundVO from "../../vos/ProductNotFoundVO"

export const selectProduct = (routeId) => (dispatch, getState) => {
	let isNew = routeId === ROUTE_PRODUCT_ADD
	if (!isNew && !isProductsDataReady(getState())) {
		dispatch(fetchProducts(() => {
			assignProduct(isNew, routeId, dispatch, getState())
		}))
	} else {
		assignProduct(isNew, routeId, dispatch, getState())
	}
}

function assignProduct(isNew, routeId, dispatch, state) {
	const products = state.products
	const productId = parseInt(routeId)
	const product = isNew
		? new ProductVO({id: Math.max(...products.map(p => p.id + 1), 0)})
		: products.find(p => p.id === productId) || new ProductNotFoundVO({id: routeId})
	const productExist = product instanceof ProductVO
	console.log("> action: product -> selectProduct > \n|\t product =", product, "\n|\t isNew =", isNew, "\n|\t productId =", routeId, "\n|\t products.length =", products.length)
	
	dispatch(setProduct(product, isNew))
	if (productExist && !isCategoriesDataReady(state)) {
		dispatch(fetchCategories())
	}
}

export const submitProductData = (productFormData) => (dispatch, getState) => {
	const product = dispatch(validateProductData(productFormData))
	console.log("> action: product -> submitProductData > product =", product)
	if (product) {
		const isNew = getState().product.reference === null
		dispatch(addUpdateProduct(product, isNew))
	}
}

export const validateProductData = (productFormData) => (dispatch, getState) => {
	let result = true
	let errors = []
	let categories = []
	let product = getState().product.data
	let featuredChanged = false
	
	for (let pair of productFormData.entries()) {
		let value = pair[1]
		let key = pair[0]
		console.log("> action: validate > key = " + key, "|", value)
		switch (key) {
			case "name":
				if (value.length === NAME_MIN_CHARACTERS) {
					errors.push(ERROR_PRODUCT_FORM_NAME_REQUIRED)
					result = false
				} else if (value.length === NAME_MAX_CHARACTERS) {
					errors.push(ERROR_PRODUCT_FORM_NAME_EXCEED_LENGTH)
					result = false
				}
				product.name = value
				break
			case "brand":
				product.brand = value
				break
			case "itemsInStock":
				product.itemsInStock = parseInt(value) || 0
				break
			case "categories":
				categories.push(parseInt(value))
				break
			case "rating":
				let rating = parseInt(value)
				let autoFeatured = rating >= RATING_TO_TRIGGER_AUTO_FEATURE
				product.rating = rating
				featuredChanged = autoFeatured !== product.autoFeatured
				product.autoFeatured = autoFeatured
				break
			case "receiptDate":
				if (value.length > 0) product.receiptDate = new Date(value).getTime()
				break
			case "expirationDate":
				if (value.length > 0) product.expirationDate = new Date(value).getTime()
				break
			case "featured":
				product.featured = value === "on"
				featuredChanged = true
				break
			default:
		}
	}
	
	if (product.rating < RATING_TO_TRIGGER_AUTO_FEATURE && !featuredChanged) {
		product.featured = false
	}
	
	if (categories.length < CATEGORIES_SELECTED_MIN) {
		errors.push(ERROR_PRODUCT_FORM_CATEGORIES_NO_MIN)
		result = false
	} else if (categories.length > CATEGORIES_SELECTED_MAX) {
		errors.push(ERROR_PRODUCT_FORM_CATEGORIES_MAX_REACHED)
		result = false
	} else {
		product.categories = categories
	}
	
	console.log("> action: product -> validateProductData > product =", product)
	dispatch(productDataVerifyErrors(errors))
	return result ? product : null
}