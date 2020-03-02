import {action, observable} from "mobx"
import { MobXProviderContext } from 'mobx-react'
import React from "react"

class StatusStore {
	status = observable.box("")
	setStatus = action((value) => {
		this.status = value
	})
}

const CardStore = observable({

	items: 0,
	
	buyProduct(quantity) {
		this.items += quantity
	}
})

const ProductsStore = observable({
	
	buyAmount: 1,
	amount:10,
	
	get isBuyPossible() {
		return this.amount > this.buyAmount
	},
	
	buyProduct() {
		this.amount = this.amount - this.buyAmount
	}
})


export default class RootStore {
	constructor() {
		this.productsStore = ProductsStore
		this.cardStore = CardStore
		this.statusStore = new StatusStore()
	}
}

export const storesContext = React.createContext(new RootStore())

// export function insert(selector, baseComponent) {
// 	const component = ownProps => {
// 		const store = React.useContext(MobXProviderContext)
// 		return baseComponent(selector({ store, ownProps }))
// 	}
// 	component.displayName = baseComponent.name
// 	return component
// }
