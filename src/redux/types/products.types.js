export const PRODUCTS_REQUEST = 'PRODUCTS_REQUEST'
export const PRODUCTS_RECEIVE = 'PRODUCTS_RECEIVE'
export const PRODUCTS_DELETE = 'PRODUCTS_DELETE'
export const PRODUCTS_ADD_UPDATE = 'PRODUCTS_ADD_UPDATE'

export const requestProducts = () => ({
	type: PRODUCTS_REQUEST,
})
export const deleteProduct = (product) => ({
	type: PRODUCTS_DELETE,
	product
})
export const receiveProducts = (products) => ({
	type: PRODUCTS_RECEIVE,
	products,
})
export const addUpdateProduct = (product, isNew) => ({
	type: PRODUCTS_ADD_UPDATE,
	product,
	isNew,
})