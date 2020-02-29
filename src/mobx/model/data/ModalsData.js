import {types} from "mobx-state-tree"
import {STATUS_MODAL_HIDE_ALL} from "../../../const/status/ModalsStatus"

const ModalsData = types
	.model('ModalsData', {
		status: types.optional(types.integer, STATUS_MODAL_HIDE_ALL),
	}).views(self => ({
		get showModal() { return self.status > STATUS_MODAL_HIDE_ALL }
	}))

export default ModalsData