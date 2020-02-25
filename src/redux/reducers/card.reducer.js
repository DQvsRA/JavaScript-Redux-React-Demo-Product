import {PRODUCTS_BUY_PRODUCT} from "../types"

const cardInitialState = {
	items: 0
}

const cardReducer = (state = cardInitialState, action) => {
	switch (action.type) {
		case PRODUCTS_BUY_PRODUCT:
			return { items: state.items + action.quantity }
		default: return state
	}
}

export default cardReducer