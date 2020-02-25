import {
	buyProduct,
	setStatus
} from "../store"
import {
	STATUS_PRODUCTS_NO_PRODUCTS,
	STATUS_PRODUCTS_PURCHASE_POSSIBLE,
	STATUS_PRODUCTS_SAVING
} from "../../consts/status"

export const buyProductAction = () => (dispatch, getState) => {
  let availableItems = getState().products.amount
	const amountToBuy = 1
	if (availableItems > 0) {
    setTimeout((items) => (() => {
      dispatch(buyProduct(amountToBuy))
      dispatch(setStatus(items === 0
        ? STATUS_PRODUCTS_NO_PRODUCTS
        : STATUS_PRODUCTS_PURCHASE_POSSIBLE
      ))
    })(availableItems - amountToBuy), 1000)
    dispatch(setStatus(STATUS_PRODUCTS_SAVING))
  }
}