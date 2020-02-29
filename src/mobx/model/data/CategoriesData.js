import {applySnapshot, flow, types} from "mobx-state-tree"
import CategoryVO from "../vo/CategoryVO"
import {STATUS_CATEGORIES_DATA_READY, STATUS_CATEGORIES_NO_DATA} from "../../../const/status/ApplicationStatus"
import CategoriesLoader from "../../loader/CategoriesLoader"
import {CATEGORIES_LOAD_DATA} from "../../../const/Types"

const CategoriesData = types
	.model('CategoriesData', {
		data: types.optional(types.array(CategoryVO), []),
		status: types.optional(types.integer, STATUS_CATEGORIES_NO_DATA)
	})
	.views(self => ({
		get sortedById() {
			return self.data.reduce((previous, category) => {
				return {...previous, [category.id]: category.name}
			}, {})
		}
	}))
	.actions(self => ({
		[CATEGORIES_LOAD_DATA]: flow(function* load() {
			applySnapshot(self, {data: yield CategoriesLoader.fetch()})
			self.status = STATUS_CATEGORIES_DATA_READY
		})
	}))

export default CategoriesData