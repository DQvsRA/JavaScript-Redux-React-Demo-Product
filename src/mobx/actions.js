import * as types from "../const/Types"

const categoriesLoadData = () => ({ type: types.CATEGORIES_LOAD_DATA })

export const loadApplicationData = (dispatch, getState) => {
	console.log("mbx > store: action -> APPLICATION_LOAD_DATA")
	const store = getState()
	if (!store.isCategoriesDataReady)
		dispatch(categoriesLoadData())
	// if (!self.isProductsDataReady)
	// 	yield self.loadProducts()
	// return ({ type: types.APPLICATION_LOAD_DATA })
}
export const loadCategoriesData = (dispatch, getState) => {
	console.log(getState())
	return ({ type: types.CATEGORIES_LOAD_DATA })
}