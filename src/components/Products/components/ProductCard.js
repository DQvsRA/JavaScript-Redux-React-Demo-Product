import React from 'react'
import PropTypes from 'prop-types'
import {Card, CardText, CardBody, CardTitle, ListGroup, ListGroupItem} from 'reactstrap'
import ProductActions from "./ProductActions"
import {formatDate} from "../../../utils/dateUtils"

const shortDateFormat = 'MM/DD/YYYY'
const longDateFormat = 'MM/DD/YYYY hh:mm a'

const ProductCard = (props) => {
  return (
    <Card>
      <CardBody>
        <CardTitle><h5>{props.name}</h5></CardTitle>
        <CardText tag="div">
          <ListGroup>
            <ListGroupItem>Brand: {props.brand}</ListGroupItem>
            <ListGroupItem>Rating: {props.rating}</ListGroupItem>
            <ListGroupItem>Featured: {props.featured ? 'Yes' : 'No'}</ListGroupItem>
            <ListGroupItem>Items In Stock: {props.itemsInStock}</ListGroupItem>
            <ListGroupItem>
              Categories:
              <ul>
                {props.categories.map(category => (
                  <li key={category.id}>{category.name}</li>
                ))}
              </ul>
            </ListGroupItem>
            <ListGroupItem>Receipt Date: {formatDate(props.receiptDate, shortDateFormat)}</ListGroupItem>
            <ListGroupItem>Expiration Date: {formatDate(props.expirationDate, shortDateFormat)}</ListGroupItem>
            <ListGroupItem>Created At: {formatDate(props.createdAt, longDateFormat)}</ListGroupItem>
          </ListGroup>
          {!props.no_actions && <ProductActions pid={props.id}/>}
        </CardText>
      </CardBody>
    </Card>
  )
}

ProductCard.propTypes = {
  /* ProductVO destructed to props */
  no_actions: PropTypes.bool,
}

export default ProductCard
