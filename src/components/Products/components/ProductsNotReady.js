import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Alert, Spinner} from 'reactstrap'

const ProductsNotReady = ({ status }) => {
  return (
    <Fragment>
      <Alert color="light">{"status: " + status}</Alert>
      <Spinner/>
    </Fragment>
  )
}

ProductsNotReady.propTypes = {
  status: PropTypes.number.isRequired,
}

export default ProductsNotReady
