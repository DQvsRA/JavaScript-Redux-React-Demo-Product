import {PRODUCTS_BUY_PRODUCT, PRODUCTS_CHANGE_BUY_AMOUNT} from "../types"

const productsInitialState = {
	amount: 10,
	buyAmount: 1,
}

const productsReducer = (state = productsInitialState, action) => {
	switch (action.type) {
		case PRODUCTS_BUY_PRODUCT:
			return { ...state, amount: state.amount - action.quantity }
		case PRODUCTS_CHANGE_BUY_AMOUNT:
			return { ...state, buyAmount: action.value }
		default: return state
	}
}

export default productsReducer