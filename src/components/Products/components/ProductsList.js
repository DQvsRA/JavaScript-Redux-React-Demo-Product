import React from 'react'
import PropTypes from 'prop-types'
import ProductCard from './ProductCard'
import { Container, Row, Col } from 'reactstrap'
import { chunk } from 'lodash'
import {PRODUCT_LIST_ITEMS_IN_ROW} from "../../../const/Commons"

const ProductsList = ({ data }) => {
  const productsRows = chunk(data, PRODUCT_LIST_ITEMS_IN_ROW)
  const columnSize = Math.floor(12 / PRODUCT_LIST_ITEMS_IN_ROW)
  
  return (
    <Container>
      {productsRows.map((row, index) => (
        <Row key={index} className="mb-5">
          {row.map(product => (
            <Col className="products-product-card" sm={columnSize} key={product.id + product.key} >
              <ProductCard product={product}/>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  )
}

ProductsList.propTypes = {
  data: PropTypes.array.isRequired,
}

export default ProductsList
