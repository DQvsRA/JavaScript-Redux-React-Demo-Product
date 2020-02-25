import {buyProduct, setStatus, STATUS_PURCHASE_NO_PRODUCTS} from "./products.store"

export const buyProductAction = () => (dispatch, getState) => {
	if (getState().products.amount > 0) {
		dispatch(buyProduct())
	} else {
		dispatch(setStatus(STATUS_PURCHASE_NO_PRODUCTS))
	}
}