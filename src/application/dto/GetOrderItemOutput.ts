export default class GetOrderItemOutput {
    constructor(
        readonly description: string,
        readonly price: number,
        readonly quantity: number
    ){}
}