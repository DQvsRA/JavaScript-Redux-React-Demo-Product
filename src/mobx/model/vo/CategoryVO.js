import {types} from "mobx-state-tree"

const CategoryVO = types.model('CategoryVO', {
	id: types.optional(types.identifierNumber, 0),
	name: types.optional(types.string, ""),
})

export default CategoryVO

