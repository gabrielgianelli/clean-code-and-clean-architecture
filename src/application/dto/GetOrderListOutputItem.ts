export default class GetOrderListOutputItem {
    constructor(
        readonly code: string,
        readonly cpf: string,
        readonly issueDate: Date,
        readonly total: number
    ){}
}