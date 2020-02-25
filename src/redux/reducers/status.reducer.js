import {STATUS_SET} from "../types"
import {STATUS_PRODUCTS_PURCHASE_POSSIBLE} from "../../consts/status"

const statusInitialState = {
	status: STATUS_PRODUCTS_PURCHASE_POSSIBLE
}


const statusReducer = (state = statusInitialState, action) => {
	switch (action.type) {
		case STATUS_SET:
			return { status: action.value }
		default: return state
	}
}

export default statusReducer