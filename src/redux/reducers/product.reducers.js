import ProductVO from "../../vos/ProductVO"
import {PRODUCTS_ADD_UPDATE} from "../types/products.types"
import {PRODUCT_DATA_VERIFY_ERRORS, PRODUCT_RESET, PRODUCT_SET} from "../types/product.types"
import ProductNotFoundVO from "../../vos/ProductNotFoundVO"

const productInitialState = {
  data: null,
  reference: null,
  errors: []
}

export function productReducers(state = productInitialState, action) {
  switch (action.type) {
    case PRODUCTS_ADD_UPDATE:
      return {...state, reference: action.product, data: new ProductVO(action.product)}
    case PRODUCT_DATA_VERIFY_ERRORS:
      return {...state, errors: action.errors }
    case PRODUCT_RESET:
      return { data: null, reference: null, errors: [] }
    case PRODUCT_SET:
      let noProduct = action.product instanceof ProductNotFoundVO
      let reference = (noProduct || action.isNew) ? null : action.product
      return {errors: [], data: noProduct ? new ProductNotFoundVO(action.product) : new ProductVO(action.product), reference}
    default: return state
  }
}
