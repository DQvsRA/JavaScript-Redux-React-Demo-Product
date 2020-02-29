import React from 'react'
import ReactDOM from 'react-dom'
import ReactNotification from 'react-notifications-component'
import {Provider} from "react-redux"
import thunk from "redux-thunk"
import getRoutes from './routes'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-notifications-component/dist/theme.css'
import store from "./mobx/store"

import {asReduxStore, connectReduxDevtools} from "mst-middlewares"

const mstStore = store.create()
const reduxStore = asReduxStore(mstStore, thunk)
connectReduxDevtools(require("remotedev"), mstStore)
mstStore.dispatch = reduxStore.dispatch

ReactDOM.render(
	<div>
		<ReactNotification/>
		<div className="container">
			<Provider store={reduxStore}>
				{getRoutes()}
			</Provider>
		</div>
	</div>,
	document.getElementById('root')
)
