import {PRODUCT_STORAGE_NAME, SAVED_PRODUCTS} from "../../const/storage/LocalStorageKeys"
import ProductVO from "../../vos/ProductVO"
import {PRODUCTS_ADD_UPDATE, PRODUCTS_DELETE, PRODUCTS_RECEIVE} from "../types/products.types"
import {showSuccessNotification} from "../../utils/notifications"

export function productsReducers(state = [], action) {
  switch (action.type) {
    case PRODUCTS_DELETE:
      const newState = productDelete(state, action.product)
      showSuccessNotification(`Product ${action.product.id} : ${action.product.name} deleted`)
      return newState
    case PRODUCTS_ADD_UPDATE:
      if (action.isNew) {
        showSuccessNotification(`Product ${action.product.id} : ${action.product.name} added`)
        return productAdd(state, action.product)
      } else {
        showSuccessNotification("Product saved")
        return productUpdate(state, action.product)
      }
    case PRODUCTS_RECEIVE:
      return productsReceived(state, action.products)
    default:
      return state
  }
}

function productDelete(state, product) {
  let productIndex = state.indexOf(state.find(p => p.id === product.id))
  state.splice(productIndex, 1)
  const ls = window.localStorage
  const savedArray = JSON.parse(ls.getItem(SAVED_PRODUCTS)) || []
  let indexInSavedArray = savedArray.indexOf(product.key)
  if (indexInSavedArray >= 0) {
    savedArray.splice(indexInSavedArray, 1)
    ls.setItem(SAVED_PRODUCTS, JSON.stringify(savedArray))
    ls.removeItem(PRODUCT_STORAGE_NAME + product.key)
  }
  return [...state]
}

function productAdd(state, product) {
  storeToLocalStorage(product)
  return [...state, product]
}

function productUpdate(state, product) {
  const replaceProduct = state.find(p => p.id === product.id)
  const indexToReplace = state.indexOf(replaceProduct)
  const ls = window.localStorage
  const savedArray = JSON.parse(ls.getItem(SAVED_PRODUCTS)) || []
  if (savedArray.indexOf(product.key) >= 0) {
    ls.setItem(PRODUCT_STORAGE_NAME + product.key, JSON.stringify(product))
  }
  state.splice(indexToReplace, 1, product)
  return state
}

function productsReceived(state, products) {
  const ls = window.localStorage
  const savedArray = JSON.parse(ls.getItem(SAVED_PRODUCTS)) || []
  savedArray.forEach((key) => {
    let productObject = JSON.parse(ls.getItem(PRODUCT_STORAGE_NAME + key))
    let includeNotCreatedBefore = (state.length === 0 || state.find(p => p.key === key) == null)
    if (includeNotCreatedBefore)
      products.push(new ProductVO(productObject))
  })
  if (state.length > 0)
    rearrangeAlreadyCreatedItems(state, products)
  return [...products, ...state]
}

export function getProductsWithCategoriesNames(products, categoriesById) {
  return products.map(product => setProductCategoriesNames(product, categoriesById))
}

export function setProductCategoriesNames(product, categoriesById) {
  const categories = product.categories.map(id => categoriesById[id])
  return {...product, categories}
}

function rearrangeAlreadyCreatedItems(created, added) {
  const ls = window.localStorage
  let maxId = Math.max(...added.map(p => p.id + 1), 0)
  created.forEach(p => {
    if (p.id < maxId) {
      p.id = maxId++
      ls.setItem(PRODUCT_STORAGE_NAME + p.key, JSON.stringify(p))
    }
  })
}

function storeToLocalStorage(product) {
  const productKey = product.key
  const ls = window.localStorage
  const savedArray = JSON.parse(ls.getItem(SAVED_PRODUCTS)) || []
  savedArray.push(productKey)
  ls.setItem(SAVED_PRODUCTS, JSON.stringify(savedArray))
  ls.setItem(PRODUCT_STORAGE_NAME + productKey, JSON.stringify(product))
}