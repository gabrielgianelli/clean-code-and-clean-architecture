export default class FindOrderOutput {
    constructor(
        readonly code: string,
        readonly cpf: string,
        readonly issueDate: Date,
        readonly total: number
    ){}
}