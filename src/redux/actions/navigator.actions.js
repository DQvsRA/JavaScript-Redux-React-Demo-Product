import { push } from 'connected-react-router'
import {PAGE_CARD, PAGE_PRODUCTS} from "../../consts/page"
import {NAVIGATE_BACK, NAVIGATE_TO_CARD} from "../../consts/navigator"

export const navigateAction = (navigator) => (dispatch, getState) => {
	const currentPath = getState().router.location.pathname
	// console.log("> action: navigateAction -> from:", currentPath, "| navigator: " + navigator)
	
	switch (currentPath)
	{
		case PAGE_PRODUCTS:
			if (navigator === NAVIGATE_TO_CARD)
				dispatch(push(PAGE_CARD))
			break
		case PAGE_CARD:
			if (navigator === NAVIGATE_BACK)
				dispatch(push(PAGE_PRODUCTS))
			break
		default:
			dispatch(push(PAGE_PRODUCTS))
	}
	
}