const BUY_PRODUCT = "BUY_PRODUCT"
const SET_STATUS = "SET_STATUS"

export const STATUS_PURCHASE_POSSIBLE = "STATUS_PURCHASE_POSSIBLE"
export const STATUS_PURCHASE_NO_PRODUCTS = "STATUS_PURCHASE_NO_PRODUCTS"

export function buyProduct(quantity = 1) {
	return {
		type: BUY_PRODUCT,
		quantity: quantity
	}
}

export function setStatus(value) {
	return {
		type: SET_STATUS,
		value
	}
}

const statusInitialState = {
	value: STATUS_PURCHASE_POSSIBLE
}

const productInitialState = {
	amount: 10
}

const cardInitialState = {
	items: 0
}

const productsReducer = (state = productInitialState, action) => {
	switch (action.type) {
		case BUY_PRODUCT:
			return { amount: state.amount - action.quantity }
		default:
			return state
	}
}

const cardReducer = (state = cardInitialState, action) => {
	switch (action.type) {
		case BUY_PRODUCT:
			return { items: state.items + action.quantity }
		default:
			return state
	}
}

const statusReducer = (state = statusInitialState, action) => {
	switch (action.type) {
		case SET_STATUS:
			return { value: action.value }
		default:
			return state
	}
}

const redux = require("redux")
const trunk = require("redux-thunk")
const devtools = require("redux-devtools-extension")

const reducers = redux.combineReducers({
	card: cardReducer,
	status: statusReducer,
	products: productsReducer,
})

// const store = redux.createStore(reducers)
// const store = redux.createStore(reducers, redux.applyMiddleware(trunk.default))
const store = redux.createStore(reducers, devtools.composeWithDevTools(redux.applyMiddleware(trunk.default)))
export default store

// const initialState = store.getState()
// store.dispatch(buyProduct())
// const buyState = store.getState()
//
// const output = `
// 	Initial State:<br>
// 	<pre>${JSON.stringify(initialState, null, 4)}</pre>
// 	<hr>
// 	Buy State:<br>
// 	<pre>${JSON.stringify(buyState, null, 4)}</pre>
// `
// const app = require("express")()
// app.get("/", (res, req) => req.send(output))
// app.listen(3003, () => { console.log("App is running - OK") })