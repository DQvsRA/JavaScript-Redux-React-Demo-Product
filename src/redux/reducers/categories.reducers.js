import {CATEGORIES_RECEIVE} from "../types/categories.types"

export function categoriesReducers(state = [], action) {
  switch (action.type) {
    case CATEGORIES_RECEIVE: return [ ...action.categories ]
    default: return state
  }
}

export function getCategoriesById(categories) {
  return categories.reduce((previous, category) => {
    return {...previous, [category.id]: category}
  }, {})
}
