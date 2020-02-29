import {productApi} from "../../gateways/ProductApi"

class ProductsLoader {
	static async fetch() {
		const json = productApi.getProducts()
		await new Promise(r => setTimeout(r, 30))
		return json
	}
}

export default ProductsLoader