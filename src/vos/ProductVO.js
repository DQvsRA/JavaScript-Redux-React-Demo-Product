import {RATING_TO_TRIGGER_AUTO_FEATURE} from "../const/Commons"

export default class ProductVO {

    id: Number
    name: String
    brand: String
    rating: Number
    featured: Boolean
    autoFeatured: Boolean
    itemsInStock: Number
    receiptDate: String
    expirationDate: String
    createdAt: String
    categories: Array
    key: Number

    constructor(input) {
        this.id = input ? input.id : 0
        this.name = input ? input.name : ""
        this.rating = input ? input.rating : 1
        this.featured = input ? input.featured : false
        this.autoFeatured = this.rating >= RATING_TO_TRIGGER_AUTO_FEATURE
        this.itemsInStock = input ? input.itemsInStock : 0
        this.receiptDate = input && input.receiptDate ? input.receiptDate : null
        this.brand = input && input.brand ? input.brand : ""
        this.categories = input && input.categories ? input.categories : []
        this.expirationDate = input && input.expirationDate ? input.expirationDate : null
        this.createdAt = input && input.createdAt ? input.createdAt : new Date()
        this.key = input && input.key ? input.key : (Date.now() + this.id)
    }
}