import GetOrderItemOutput from './GetOrderItemOutput';

export default class GetOrderOutput {
    constructor(
        readonly code: string,
        readonly cpf: string,
        readonly issueDate: Date,
        readonly items: GetOrderItemOutput[],
        readonly shippingCost: number,
        readonly total: number
    ){}
}