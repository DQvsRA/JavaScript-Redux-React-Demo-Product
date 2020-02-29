import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  ListGroup as LG,
  ListGroupItem as LGI,
} from 'reactstrap'
import ProductActions from "./ProductActions"
import {inject} from "mobx-react"

const ProductCard = (props) => {
  
  const {store, id, no_actions} = props
  const product = store.getProductByID(id)
  const categories = store.getProductCategoriesNames(product)
  
  return (
    <Card>
      <CardBody>
        <CardTitle><h5>{product.name}</h5></CardTitle>
        <CardText tag="div">
          <LG>
            <LGI>Brand: {product.brand}</LGI>
            <LGI>Rating: {product.rating}</LGI>
            <LGI>Featured: {product.featured ? 'Yes' : 'No'}</LGI>
            <LGI>Items In Stock: {product.itemsInStock}</LGI>
            <LGI>Categories:
              <ul>{categories.map((category, index) =>
                (<li key={index}>{category}</li>))}</ul>
            </LGI>
            <LGI>Receipt Date: {store.getProductReceiptDate(product)}</LGI>
            <LGI>Expiration Date: {store.getProductExpirationDate(product)}</LGI>
            <LGI>Created At: {store.getProductCreatedDate(product)}</LGI>
          </LG>
          {!no_actions && <ProductActions pid={product.id}/>}
        </CardText>
      </CardBody>
    </Card>
  )
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  no_actions: PropTypes.bool,
}

export default inject('store')(ProductCard)
