export const HIDE_ALL_MODALS = "HIDE_ALL_MODALS"
export const SHOW_MODAL_PRODUCT_DELETE_REQUEST = "SHOW_MODAL_PRODUCT_DELETE_REQUEST"

export const showModalRequestDeleteProduct = (product) => ({
	type: SHOW_MODAL_PRODUCT_DELETE_REQUEST,
	product
})

export const hideAllModals = () => ({
	type: HIDE_ALL_MODALS
})