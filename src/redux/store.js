import {applyMiddleware, combineReducers, createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import trunk from "redux-thunk"
import { connectRouter } from 'connected-react-router'
import cardReducer from "./reducers/card.reducer"
import statusReducer from "./reducers/status.reducer"
import productsReducer from "./reducers/products.reducer"
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory()

const reducers = combineReducers({
	card: cardReducer,
	status: statusReducer,
	products: productsReducer,
	
	router: connectRouter(history),
})

const store = createStore(reducers,
	composeWithDevTools(
		applyMiddleware(
			trunk, routerMiddleware(history)
		)
	)
)

export default store