import * as modalsActions from '../types/modals.types'
import {isEqual} from 'lodash'

import {
	STATUS_PRODUCT_DATA_NO_PRODUCT,
	STATUS_PRODUCT_DATA_NULL,
	STATUS_PRODUCT_DATA_READY_ADD,
	STATUS_PRODUCT_DATA_READY_EDIT
} from "../../const/status/ProductStatus"
import {
	STATUS_APPLICATION_NOT_READY,
	STATUS_CATEGORIES_DATA_READY,
	STATUS_PRODUCTS_DATA_READY
} from "../../const/status/ApplicationStatus"
import {STATUS_MODAL_HIDE_ALL, STATUS_MODAL_SHOW_DELETE_REQUEST} from "../../const/status/ModalsStatus"
import {PRODUCTS_ADD_UPDATE, PRODUCTS_RECEIVE, PRODUCTS_REQUEST} from "../types/products.types"
import {PRODUCT_RESET, PRODUCT_SET} from "../types/product.types"
import {CATEGORIES_RECEIVE, CATEGORIES_REQUEST} from "../types/categories.types"
import {showErrorNotification, showInfoNotification} from "../../utils/notifications"
import ProductNotFoundVO from "../../vos/ProductNotFoundVO"

const initialStatusState = {
	product: -1,
	products: -1,
	categories: -1,
	modals: STATUS_MODAL_HIDE_ALL,
}

export function statusReducers(state = initialStatusState, action) {
	switch (action.type) {
		case CATEGORIES_REQUEST:
			return {...state, categories: STATUS_APPLICATION_NOT_READY}
		case CATEGORIES_RECEIVE:
			showInfoNotification("Categories loaded")
			return {...state, categories: STATUS_CATEGORIES_DATA_READY}
		case PRODUCTS_ADD_UPDATE:
			return {...state, product: STATUS_PRODUCT_DATA_READY_EDIT}
		case PRODUCTS_REQUEST:
			return {...state, products: STATUS_APPLICATION_NOT_READY}
		case PRODUCTS_RECEIVE:
			showInfoNotification("Products loaded")
			return {...state, products: STATUS_PRODUCTS_DATA_READY}
		
		case modalsActions.HIDE_ALL_MODALS:
        return {...state, modals: STATUS_MODAL_HIDE_ALL}
		case modalsActions.SHOW_MODAL_PRODUCT_DELETE_REQUEST:
			return {...state, modals: STATUS_MODAL_SHOW_DELETE_REQUEST}
		
		case PRODUCT_RESET:
			return {...state, product: STATUS_PRODUCT_DATA_NULL}
		case PRODUCT_SET:
			let noProduct = action.product instanceof ProductNotFoundVO
			if (noProduct) showErrorNotification(`No product found with this ID: ${action.product.id}`)
			else showInfoNotification(action.isNew ? "Ready to add new product" : "Product ready to be changed")
			
			return {...state, product: noProduct ? STATUS_PRODUCT_DATA_NO_PRODUCT : (action.isNew ? STATUS_PRODUCT_DATA_READY_ADD : STATUS_PRODUCT_DATA_READY_EDIT)}
		
		default:
			return state
	}
}

export function isApplicationDataReady(status) {
	return status === (STATUS_CATEGORIES_DATA_READY + STATUS_PRODUCTS_DATA_READY)
}

export function isCategoriesDataReady(state) {
	return state.status.categories >= STATUS_CATEGORIES_DATA_READY
}

export function isProductsDataReady(state) {
	return state.status.products >= STATUS_PRODUCTS_DATA_READY
}

export function isProductDataReady(state) {
	return state.status.product >= STATUS_PRODUCT_DATA_READY_EDIT
		&& state.status.categories === STATUS_CATEGORIES_DATA_READY
}

export function isProductChanged(state) {
	return !isEqual(state.product.data, state.product.reference)
}

export function getApplicationDataStatus(state) {
	return state.status.products + state.status.categories
}