export default class ProductNotFoundVO {

    id: Number

    constructor(input) {
        this.id = input ? input.id : 0
    }
}