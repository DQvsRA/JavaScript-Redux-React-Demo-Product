import React from 'react'
import PropTypes from 'prop-types'
import {Card, CardText, CardBody, CardTitle, ListGroup, ListGroupItem} from 'reactstrap'
import moment from 'moment'
import ProductActions from "./ProductActions"

const shortDateFormat = 'MM/DD/YYYY'
const longDateFormat = 'MM/DD/YYYY hh:mm a'

const ProductCard = ({ product, no_actions }) => {
  const receiptDate =  product.receiptDate ? moment(product.receiptDate).format(shortDateFormat) : '-'
  const expirationDate =  product.expirationDate ? moment(product.expirationDate).format(shortDateFormat) : '-'
  const createdAt = product.createdAt ? moment(product.createdAt).format(longDateFormat) : '-'

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
            <ListGroupItem>Receipt Date: {receiptDate}</ListGroupItem>
            <ListGroupItem>Expiration Date: {expirationDate}</ListGroupItem>
            <ListGroupItem>Created At: {createdAt}</ListGroupItem>
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
