import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'
import {connect} from "react-redux"

const ProductsMissing = ({ id }) => {
  return (
    <Container>
      <h2>{"No product with id: " + id}</h2>
    </Container>
  )
}

ProductsMissing.propTypes = {
  id: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  return {
    id: state.product.data.id,
  }
}

export default connect(
  mapStateToProps
)(ProductsMissing)