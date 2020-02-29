import {applySnapshot, flow, getType, types} from 'mobx-state-tree'
import {
	STATUS_APPLICATION_NOT_READY,
	STATUS_CATEGORIES_DATA_READY,
	STATUS_PRODUCTS_DATA_READY
} from "../const/status/ApplicationStatus"
import moment from "moment"
import {
	DATE_FORMAT_LONG,
	DATE_FORMAT_SHORT,
	EXPIRATION_DATE_LIMIT,
	ROUTE_PRODUCT,
	ROUTE_PRODUCT_ADD
} from "../const/Commons"
import {STATUS_PRODUCT_DATA_NO_PRODUCT, STATUS_PRODUCT_DATA_READY_EDIT} from "../const/status/ProductStatus"
import {STATUS_MODAL_HIDE_ALL, STATUS_MODAL_SHOW_DELETE_REQUEST} from "../const/status/ModalsStatus"
import ProductVO from "./model/vo/ProductVO"
import ProductNotFoundVO from "./model/vo/ProductNotFoundVO"
import ProductsData from "./model/data/ProductsData"
import SelectedData from "./model/data/SelectedData"
import CategoriesData from "./model/data/CategoriesData"
import ModalsData from "./model/data/ModalsData"

import {APPLICATION_LOAD_DATA} from "../const/Types"
import {loadCategoriesData} from "./actions"

const store = types
	.model("store", {
		status: types.optional(types.integer, STATUS_APPLICATION_NOT_READY),
		modals: types.optional(ModalsData, () => ModalsData.create({})),
		products: types.optional(ProductsData, () => ProductsData.create({})),
		selected: types.optional(SelectedData, () => SelectedData.create({})),
		categories: types.optional(CategoriesData, () => CategoriesData.create({})),
	})
	.views(self => ({
		getProductByID(id) { return self.products.data.find(p => p.id === id) },
		getProductCategoriesNames(product) { return product.categories.map(cid => self.categories.sortedById[cid]) },
		get isCategoriesDataReady() { return self.categories.status >= STATUS_CATEGORIES_DATA_READY },
		get isProductsDataReady() { return self.products.status >= STATUS_PRODUCTS_DATA_READY },
		get isApplicationDataReady() { return self.isCategoriesDataReady && self.isProductsDataReady },
		get isSelectedProductDataReady() {
			return self.selected.status >= STATUS_PRODUCT_DATA_READY_EDIT
				&& self.categories.status === STATUS_CATEGORIES_DATA_READY
		},
		getProductReceiptDate(product) { return product.receiptDate ? moment(product.receiptDate).format(DATE_FORMAT_SHORT) : '-' },
		getProductExpirationDate(product) { return product.expirationDate ? moment(product.expirationDate).format(DATE_FORMAT_SHORT) : '-' },
		getProductMaxExpirationDate() { return moment().add(EXPIRATION_DATE_LIMIT, 'days').format(DATE_FORMAT_SHORT) },
		getProductCreatedDate(product) { return product.createdAt ? moment(product.createdAt).format(DATE_FORMAT_LONG) : '-' }
	}))
	.actions(self => ({
		saveProduct: flow(function* (product) {
			self.products.add(product)
		}),
		cancelDeleteProduct: () => {
			self.modals.status = STATUS_MODAL_HIDE_ALL
			self.resetSelectedProduct()
		},
		confirmDeleteProduct: () => {
			self.modals.status = STATUS_MODAL_HIDE_ALL
			self.products.delete(self.selected.reference)
			self.resetSelectedProduct()
		},
		requestDeleteProductById: (id) => {
			self.selectProductFromRouteId(id.toString())
			self.modals.status = STATUS_MODAL_SHOW_DELETE_REQUEST
		},
		resetSelectedProduct: () => { applySnapshot(self.selected, {}) },
		selectProductFromRouteId: flow(function* (routeId) {
			const isNew = routeId === ROUTE_PRODUCT_ADD
			const products = self.products.data
			const productId = parseInt(routeId)
			
			if (!isNew && !self.isProductsDataReady)
				yield self.loadProducts()
			
			const product = isNew ? ProductVO.create({id: Math.max(...products.map(p => p.id + 1), 0)})
				: products.find(p => p.id === productId) || ProductNotFoundVO.create({id: productId})
			const productExist = getType(product) === ProductVO
			self.selected.setup(product, isNew, routeId)
			if (productExist) {
				if (!self.isCategoriesDataReady)
					yield self.loadCategories()
			}
			else self.selected.status = STATUS_PRODUCT_DATA_NO_PRODUCT
			
			console.log("mbx > selectProduct > \n|\t product =", product, "\n|\t isEditing =", isNew, "\n|\t productExist =", productExist, "\n|\t productId =", routeId, "\n|\t products.length =", products.length)
		}),
		listenHistoryChangesOnRoute(history, route) {
			const unlisten = history.listen((location) => {
				const path = location.pathname
				if (path.indexOf(route) === 0) {
					if (route === ROUTE_PRODUCT)
					{
						const routeId = path.split("/").pop()
						self.selectProductFromRouteId(routeId)
					}
				} else {
					if (route === ROUTE_PRODUCT)
					{
						self.resetSelectedProduct()
					}
					unlisten()
				}
			})
		},
		[APPLICATION_LOAD_DATA]: flow(function* () {
			console.log("mbx > store: action -> APPLICATION_LOAD_DATA")
			if (!self.isCategoriesDataReady)
				yield self.loadCategories()
			if (!self.isProductsDataReady)
				yield self.loadProducts()
		}),
		loadCategories: flow(function* () {
			// yield self.categories.load()
			// self.dispatch(loadCategoriesData())
			self.status = STATUS_CATEGORIES_DATA_READY
		}),
		loadProducts: flow(function* () {
			yield self.products.load()
			self.status = STATUS_PRODUCTS_DATA_READY
		})
	}))

export default store