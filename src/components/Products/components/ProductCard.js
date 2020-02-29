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
import { formatDate} from "../../../utils/dateFormatter"
import {DATE_FORMAT_SHORT} from "../../../const/Commons"

const ProductCard = (props) => {
  return (
    <Card>
      <CardBody>
        <CardTitle><h5>{props.name}</h5></CardTitle>
        <CardText tag="div">
          <LG>
            <LGI>Brand: {props.brand}</LGI>
            <LGI>Rating: {props.rating}</LGI>
            <LGI>Featured: {props.featured ? 'Yes' : 'No'}</LGI>
            <LGI>Items In Stock: {props.itemsInStock}</LGI>
            <LGI>Categories:
              <ul>{props.categories.map((category, index) =>
                (<li key={index}>{props.categoriesNamesById[category]}</li>))}</ul>
            </LGI>
            <LGI>Receipt Date: {formatDate(props.receiptDate, DATE_FORMAT_SHORT)}</LGI>
            <LGI>Expiration Date: {formatDate(props.expirationDate, DATE_FORMAT_SHORT)}</LGI>
            <LGI>Created At: {formatDate(props.createdAt, DATE_FORMAT_SHORT)}</LGI>
          </LG>
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

export default inject(({store}) => ({
  categoriesNamesById: store.categories.sortedById,
})
)(ProductCard)
