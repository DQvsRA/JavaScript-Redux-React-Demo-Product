export const PRODUCT_SET = 'PRODUCT_SET'
export const PRODUCT_RESET = 'PRODUCT_RESET'
export const PRODUCT_DATA_VERIFY_ERRORS = 'PRODUCT_DATA_VERIFY_ERRORS'

export const setProduct = (product, isNew) => ({
	type: PRODUCT_SET,
	product,
	isNew,
})

export const productDataVerifyErrors = (errors) => ({
	type: PRODUCT_DATA_VERIFY_ERRORS,
	errors
})

export const resetProduct = () => ({
	type: PRODUCT_RESET,
})