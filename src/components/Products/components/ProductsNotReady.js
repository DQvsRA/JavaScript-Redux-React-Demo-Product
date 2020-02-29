import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Alert, Spinner} from 'reactstrap'
import {
  STATUS_APPLICATION_NOT_READY,
  STATUS_CATEGORIES_DATA_READY,
  STATUS_PRODUCTS_DATA_READY
} from "../../../const/status/ApplicationStatus"

const ProductsNotReady = ({ status }) => {
  return (
    <Fragment>
      <Alert color="light">{"status: " + statusToText(status)}</Alert>
      <Spinner/>
    </Fragment>
  )
}

function statusToText(status) {
  switch(status) {
    case STATUS_CATEGORIES_DATA_READY: return "STATUS_CATEGORIES_DATA_READY"
    case STATUS_PRODUCTS_DATA_READY: return "STATUS_PRODUCTS_DATA_READY"
    case STATUS_APPLICATION_NOT_READY: return "STATUS_APPLICATION_NOT_READY"
    default: return "STATUS_UNKNOWN"
  }
}

ProductsNotReady.propTypes = {
  status: PropTypes.number.isRequired,
}

export default ProductsNotReady
