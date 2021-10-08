import Item from "./Item";

export default class PlaceOrderInput {
    constructor(
        readonly cpf: string,
        readonly orderItems: {
            idItem: number,
            quantity: number
        }[]
    ){}
}