import moment from "moment"
import {DATE_FORMAT_SHORT, EXPIRATION_DATE_LIMIT} from "../const/Commons"

export function formatDate(dateString, format) { return dateString ? moment(dateString).format(format) : '-' }
export function getMaxExpirationDate() { return moment().add(EXPIRATION_DATE_LIMIT, 'days').format(DATE_FORMAT_SHORT) }
