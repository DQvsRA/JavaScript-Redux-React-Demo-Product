import {applySnapshot, clone, getRoot, getSnapshot, types} from "mobx-state-tree"
import ProductVO from "../vo/ProductVO"
import ProductNotFoundVO from "../vo/ProductNotFoundVO"
import {
	STATUS_PRODUCT_DATA_NO_PRODUCT,
	STATUS_PRODUCT_DATA_NULL,
	STATUS_PRODUCT_DATA_READY_ADD,
	STATUS_PRODUCT_DATA_READY_EDIT
} from "../../../const/status/ProductStatus"
import {
	ERROR_PRODUCT_FORM_CATEGORIES_MAX_REACHED,
	ERROR_PRODUCT_FORM_CATEGORIES_NO_MIN,
	ERROR_PRODUCT_FORM_NAME_EXCEED_LENGTH,
	ERROR_PRODUCT_FORM_NAME_REQUIRED
} from "../../../const/errors/ProductFormErrors"
import {isEqual} from "lodash"
import {
	CATEGORIES_SELECTED_MAX,
	CATEGORIES_SELECTED_MIN,
	NAME_MAX_CHARACTERS,
	NAME_MIN_CHARACTERS,
	RATING_TO_TRIGGER_AUTO_FEATURE
} from "../../../const/Commons"

const SelectedData = types
	.model('SelectedData', {
		product: types.maybeNull(types.union(ProductVO, ProductNotFoundVO)),
		reference: types.maybeNull(types.union(types.safeReference(ProductVO, ((ref) => ({
			get: () => ref, set: (value) => {
				ref = value
			}
		}))()), ProductNotFoundVO)),
		status: types.optional(types.integer, STATUS_PRODUCT_DATA_NULL),
		errors: types.array(types.string, []),
		routeId: types.optional(types.string, "")
	})
	.views(self => ({
		get hasErrors() {
			return self.errors.length > 0
		},
		get isNameInvalid() {
			return self.hasErrors && (self.errors.indexOf(ERROR_PRODUCT_FORM_NAME_REQUIRED) >= 0 || self.errors.indexOf(ERROR_PRODUCT_FORM_NAME_EXCEED_LENGTH) >= 0)
		},
		get isCategoriesInvalid() {
			return self.hasErrors && (self.errors.indexOf(ERROR_PRODUCT_FORM_CATEGORIES_NO_MIN) >= 0 || self.errors.indexOf(ERROR_PRODUCT_FORM_CATEGORIES_MAX_REACHED) >= 0)
		},
		get isChanged() {
			return !isEqual(self.product.toJSON(), self.reference.toJSON())
		},
		get isSavePossible() {
			return self.hasErrors || !self.isChanged
		},
		get noProductData() {
			return self.status === STATUS_PRODUCT_DATA_NO_PRODUCT
		},
		get isAutoFeatured() {
			return self.product.rating >= RATING_TO_TRIGGER_AUTO_FEATURE
		},
		get isNew() {
			return self.status === STATUS_PRODUCT_DATA_READY_ADD
		},
		get isEditing() {
			return self.status === STATUS_PRODUCT_DATA_READY_EDIT
		},
		get isDefaultFeatured() {
			return self.product.featured || self.isAutoFeatured
		}
	}))
	.actions(self => ({
		setup: (product, isNew, routeId) => {
			applySnapshot(self, {
				product: clone(product),
				reference: product,
				routeId: routeId,
				status: isNew
					? STATUS_PRODUCT_DATA_READY_ADD
					: STATUS_PRODUCT_DATA_READY_EDIT
			})
		},
		submitProductFormData: (formData) => {
			self.validateProductFormData(formData)
			if (self.hasErrors) return
			applySnapshot(self.reference, getSnapshot(self.product))
			if (self.isNew) getRoot(self).saveProduct(self.reference)
			self.status = STATUS_PRODUCT_DATA_READY_EDIT
		},
		validateProductFormData: (formData) => {
			let errors = []
			let categories = []
			for (let pair of formData.entries()) {
				let value = pair[1]
				let key = pair[0]
				switch (key) {
					case "name":
						if (value.length === NAME_MIN_CHARACTERS) errors.push(ERROR_PRODUCT_FORM_NAME_REQUIRED)
						else if (value.length >= NAME_MAX_CHARACTERS) errors.push(ERROR_PRODUCT_FORM_NAME_EXCEED_LENGTH)
						self.product.name = value
						break
					case "brand":
						self.product.brand = value
						break
					case "itemsInStock":
						self.product.itemsInStock = parseInt(value) || 0
						break
					case "categories":
						categories.push(parseInt(value))
						break
					case "rating":
						self.product.rating = parseInt(value)
						break
					case "receiptDate":
						if (value.length > 0) self.product.receiptDate = new Date(value).getTime()
						break
					case "expirationDate":
						if (value.length > 0) self.product.expirationDate = new Date(value).getTime()
						break
					case "featured":
						self.product.featured = value === "on"
						break
					default:
				}
			}
			
			if (categories.length < CATEGORIES_SELECTED_MIN) {
				errors.push(ERROR_PRODUCT_FORM_CATEGORIES_NO_MIN)
			} else if (categories.length > CATEGORIES_SELECTED_MAX) {
				errors.push(ERROR_PRODUCT_FORM_CATEGORIES_MAX_REACHED)
			} else {
				self.product.categories = categories
			}
			
			console.log("mbx > selected: validateProductData > \n|\t product =", self.product, "\n|\t errors =", errors)
			self.errors = errors
		}
	}))

export default SelectedData