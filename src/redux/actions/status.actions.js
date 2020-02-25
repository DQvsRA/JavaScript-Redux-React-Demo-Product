// action creators
import {STATUS_SET} from "../types"

export function setStatus(value) {
	return {
		type: STATUS_SET,
		value
	}
}