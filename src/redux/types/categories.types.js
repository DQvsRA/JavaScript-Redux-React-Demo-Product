export const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST'
export const CATEGORIES_RECEIVE = 'CATEGORIES_RECEIVE'

export const requestCategories = () => ({
	type: CATEGORIES_REQUEST,
})

export const receiveCategories = (categories) => ({
	type: CATEGORIES_RECEIVE,
	categories,
})