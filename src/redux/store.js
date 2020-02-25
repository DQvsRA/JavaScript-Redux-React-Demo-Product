// types
import {STATUS_PRODUCTS_PURCHASE_POSSIBLE} from "../consts/status"

const PRODUCT_BUY = "PRODUCT_BUY"
const STATUS_SET = "STATUS_SET"

// action creators
export function buyProduct(quantity = 1) {
	return {
		type: PRODUCT_BUY,
		quantity
	}
}

export function setStatus(value) {
	return {
		type: STATUS_SET,
		value
	}
}

// initial states
const productsInitialState = {
	amount: 10
}

const cardInitialState = {
	items: 0
}

const statusInitialState = {
	status: STATUS_PRODUCTS_PURCHASE_POSSIBLE
}

const productsReducer = (state = productsInitialState, action) => {
	switch (action.type) {
		case PRODUCT_BUY: return { amount: state.amount - action.quantity }
		default: return state
	}
}

const cardReducer = (state = cardInitialState, action) => {
	switch (action.type) {
		case PRODUCT_BUY: return { items: state.items + action.quantity }
		default: return state
	}
}

const statusReducer = (state = statusInitialState, action) => {
	switch (action.type) {
		case STATUS_SET: return { status: action.value }
		default: return state
	}
}

const redux = require("redux")
const trunk = require("redux-thunk").default
const reducers = redux.combineReducers({
	card: cardReducer,
	status: statusReducer,
	products: productsReducer,
})
const store = redux.createStore(reducers, redux.applyMiddleware(trunk))
export default store

// let state, output = ''
//
// state = store.getState()
// output += `
// 	Initial State:<br>
// 	<pre>${JSON.stringify(state, null, 4)}</pre>
// 	<hr>
// `
//
// store.dispatch(onBuyProductClick())
// store.dispatch(onBuyProductClick())
// store.dispatch(onBuyProductClick())
//
// state = store.getState()
// output += `
// 	Buy Product State:<br>
// 	<pre>${JSON.stringify(state, null, 4)}</pre>
// 	<hr>
// `
//
// const app = require("express")()
// app.get("/", (res, req) => req.send(output))
// app.listen(3003, () => { console.log("App is running - OK") })