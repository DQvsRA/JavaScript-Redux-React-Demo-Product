import {
	STATUS_PRODUCTS_NO_PRODUCTS, STATUS_PRODUCTS_NOT_ENOUGH_PRODUCTS,
	STATUS_PRODUCTS_PURCHASE_POSSIBLE,
	STATUS_PRODUCTS_SAVING
} from "../../consts/status"
import {PRODUCTS_BUY_PRODUCT, PRODUCTS_CHANGE_BUY_AMOUNT} from "../types"
import {setStatus} from "./status.actions"

function buyProduct(quantity) {
	return {
		type: PRODUCTS_BUY_PRODUCT,
		quantity
	}
}

export function setBuyAmount(value) {
	return {
		type: PRODUCTS_CHANGE_BUY_AMOUNT,
		value: parseInt(value)
	}
}

export const buyProductAction = () => (dispatch, getState) => {
	const products = getState().products
  const availableItems = products.amount
	const amountToBuy = products.buyAmount
	
	if (availableItems > 0) {
		if (amountToBuy <= availableItems) {
			setTimeout(((items) => () => {
				dispatch(buyProduct(amountToBuy))
				dispatch(setStatus(items === 0
					? STATUS_PRODUCTS_NO_PRODUCTS
					: STATUS_PRODUCTS_PURCHASE_POSSIBLE
				))
			})(availableItems - amountToBuy), 1000)
			dispatch(setStatus(STATUS_PRODUCTS_SAVING))
		} else {
			dispatch(setStatus(STATUS_PRODUCTS_NOT_ENOUGH_PRODUCTS))
		}
  }
}