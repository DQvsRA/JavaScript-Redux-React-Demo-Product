import React from "react"
import ProductsPage from "./components/ProductsPage"
import AnotherComponent from "./components/page-products/AnotherComponent"
import CardPage from "./components/CardPage"
import {Route, Switch} from "react-router-dom"
import NotFoundPage from "./components/NotFoundPage"

class Routes extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" render={() =>
					<React.Fragment>
						<ProductsPage/>
						<AnotherComponent/>
					</React.Fragment>
				}/>
				<Route path="/card" component={CardPage}/>
				<Route path="*" component={NotFoundPage}/>,
			</Switch>
		)
	}
}

export default Routes