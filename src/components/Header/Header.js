import React, { Fragment } from 'react'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom"

const Header = ({ name, route, navigation }) => {
    return (
      <Fragment>
        <h2 className="h3">{name}</h2>
        <Link to={route}><Button color="primary">{navigation}</Button></Link>
        <hr/>
      </Fragment>
)}

Header.propTypes = {
  navigation: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default Header
