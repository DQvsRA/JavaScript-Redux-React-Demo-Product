import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'

const ProductsMissing = ({ product }) => {
  return (
    <Container>
      <h2>{"No product with id: " + product.id}</h2>
    </Container>
  )
}

ProductsMissing.propTypes = {
  product: PropTypes.object.isRequired,
}

export default ProductsMissing
