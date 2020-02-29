import {categoryApi} from "../../gateways/CategoryApi"

class CategoriesLoader {
	static async fetch() {
		const json = categoryApi.getCategories()
		await new Promise(r => setTimeout(r, 30))
		return json
	}
}

export default CategoriesLoader