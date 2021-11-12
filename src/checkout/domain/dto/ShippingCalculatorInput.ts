import ShippableItem from '../entity/ShippableItem';

export default class ShippingCalculatorInput {
    constructor(
        readonly props: ShippableItem,
        readonly quantity: number
    ){}
}