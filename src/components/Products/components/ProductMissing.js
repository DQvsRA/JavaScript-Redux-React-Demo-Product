import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'

const ProductsMissing = ({ pid }) => {
  return (
    <Container>
      <h2>{"No product with id: " + pid}</h2>
    </Container>
  )
}

ProductsMissing.propTypes = {
  pid: PropTypes.string.isRequired,
}

export default ProductsMissing
