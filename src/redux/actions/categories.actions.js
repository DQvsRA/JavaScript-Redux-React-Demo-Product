import {categoryApi} from '../../gateways/CategoryApi'
import {receiveCategories, requestCategories} from "../types/categories.types"

export const fetchCategories = (callback) => async (dispatch) => {
    dispatch(requestCategories())
    const json = categoryApi.getCategories()
    await new Promise(r => setTimeout(r, 20))
    const categories = json.map(category => category)
    dispatch(receiveCategories(categories))
    if (callback) callback.call()
}