import {combineReducers} from "redux"
import { categoriesReducers } from './reducers/categories.reducers'
import { productsReducers } from './reducers/products.reducers'
import { productReducers } from './reducers/product.reducers'
import { statusReducers } from './reducers/status.reducers'

const reducers = combineReducers({
	categories: categoriesReducers,
	products: productsReducers,
	product: productReducers,
	status: statusReducers,
})

export default reducers