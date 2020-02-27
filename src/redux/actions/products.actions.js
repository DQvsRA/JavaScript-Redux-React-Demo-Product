import {productApi} from '../../gateways/ProductApi';
import ProductVO from "../../vos/ProductVO"
import {hideAllModals, showModalRequestDeleteProduct} from "../types/modals.types"
import {deleteProduct, receiveProducts, requestProducts} from "../types/products.types"
import {resetProduct, setProduct} from "../types/product.types"

export const fetchProducts = (callback) => async dispatch => {
	dispatch(requestProducts())
	const json = productApi.getProducts()
	await new Promise(r => setTimeout(r, 30))
	const products = json.map(product => new ProductVO(product))
	dispatch(receiveProducts(products))
	if (callback) callback()
}

export const confirmDeleteProduct = () => (dispatch, getState) => {
  const product = getState().product.data
  console.log("> action: products -> confirmDeleteProduct: product =", product)
  dispatch(resetProduct())
  dispatch(hideAllModals())
  dispatch(deleteProduct(product))
}

export const cancelDeleteProduct = () => (dispatch) => {
  console.log("> action: products -> cancelDeleteProduct")
  dispatch(resetProduct())
  dispatch(hideAllModals())
}

export const requestDeleteProduct = (productId) => (dispatch, getState) => {
  const product = getState().products.find(p => p.id === productId)
  console.log("> action: products -> requestDeleteProduct: product =", product)
	dispatch(setProduct(product, false))
	dispatch(showModalRequestDeleteProduct(product))
}
