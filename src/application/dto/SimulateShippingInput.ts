export default class PlaceOrderInput {
    constructor(
        readonly items: {
            idItem: number,
            quantity: number
        }[]
    ){}
}