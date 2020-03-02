import React from 'react'
import PropTypes from 'prop-types'
import {Card, CardText, CardBody, CardTitle, ListGroup, ListGroupItem} from 'reactstrap'
import ProductActions from "./ProductActions"
import {formatDate} from "../../../utils/dateUtils"

const shortDateFormat = 'MM/DD/YYYY'
const longDateFormat = 'MM/DD/YYYY hh:mm a'

const ProductCard = ({product, no_actions}) => {
  return (
    <Card>
      <CardBody>
        <CardTitle><h5>{product.name}</h5></CardTitle>
        <CardText tag="div">
          <ListGroup>
            <ListGroupItem>Brand: {product.brand}</ListGroupItem>
            <ListGroupItem>Rating: {product.rating}</ListGroupItem>
            <ListGroupItem>Featured: {product.featured ? 'Yes' : 'No'}</ListGroupItem>
            <ListGroupItem>Items In Stock: {product.itemsInStock}</ListGroupItem>
            <ListGroupItem>
              Categories:
              <ul>
                {product.categories.map(category => (
                  <li key={category.id}>{category.name}</li>
                ))}
              </ul>
            </ListGroupItem>
            <ListGroupItem>Receipt Date: {formatDate(product.receiptDate, shortDateFormat)}</ListGroupItem>
            <ListGroupItem>Expiration Date: {formatDate(product.expirationDate, shortDateFormat)}</ListGroupItem>
            <ListGroupItem>Created At: {formatDate(product.createdAt, longDateFormat)}</ListGroupItem>
          </ListGroup>
          {!no_actions && <ProductActions pid={product.id}/>}
        </CardText>
      </CardBody>
    </Card>
  )
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  no_actions: PropTypes.bool,
}

export default ProductCard
