export default class SimulateShippingInput {
    constructor(
        readonly items: {
            idItem: number,
            quantity: number
        }[]
    ){}
}