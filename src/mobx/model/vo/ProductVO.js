import {types} from "mobx-state-tree"

const ProductVO = types.model('ProductVO', {
	id: types.optional(types.identifierNumber, 0),
	name: types.optional(types.string, ""),
	brand: types.optional(types.string, ""),
	rating: types.optional(types.integer, 1),
	featured: types.optional(types.boolean, false),
	itemsInStock: types.optional(types.integer, 0),
	receiptDate: types.maybeNull(types.string),
	expirationDate: types.maybeNull(types.string),
	createdAt: types.optional(types.string, () => new Date().toDateString()),
	categories: types.array(types.integer),
	key: types.maybeNull(types.integer),
}).preProcessSnapshot(snapshot => {
	if (snapshot && !snapshot.key) snapshot.key = Date.now() + snapshot.id
	return snapshot
})

export default ProductVO