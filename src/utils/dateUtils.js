import moment from "moment"
import {EXPIRATION_DATE_LIMIT} from "../const/Commons"

export const formatDate = (date, format) => date ? moment(date).format(format) : '-'
export const expirationDateMax = (format) => moment().add(EXPIRATION_DATE_LIMIT, 'days').format(format)
