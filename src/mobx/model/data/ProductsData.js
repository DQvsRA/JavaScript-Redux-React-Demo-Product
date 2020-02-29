import {applySnapshot, flow, types} from "mobx-state-tree"
import ProductVO from "../vo/ProductVO"
import {STATUS_PRODUCTS_DATA_READY, STATUS_PRODUCTS_NO_DATA} from "../../../const/status/ApplicationStatus"
import ProductsLoader from "../../loader/ProductsLoader"
import {components} from "../../store";

const ProductsData = types
	.model('ProductsData', {
		data: types.optional(types.array(ProductVO), []),
		status: types.optional(types.integer, STATUS_PRODUCTS_NO_DATA)
	})
	.views(self => ({
		get list() { return self.data.map(p => p.id) }
	}))
	.views(self => components({
	
	}))
	.actions(self => ({
		load: flow(function* () {
			try {
				const data = yield ProductsLoader.fetch()
				if (self.data.length > 0) self.data.unshift(...data)
				else applySnapshot(self, {data})
				self.status = STATUS_PRODUCTS_DATA_READY
			} catch (error) {
				console.error("mbx > load -> ProductsData", error)
			}
		}),
		delete: (product) => self.data.splice(self.data.indexOf(product), 1),
		add: (product) => self.data.push(product)
	}))

export default ProductsData