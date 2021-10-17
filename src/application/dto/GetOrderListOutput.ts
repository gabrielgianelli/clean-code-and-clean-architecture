import GetOrderListOutputItem from "./GetOrderListOutputItem";

export default class GetOrderListOutput {
    constructor(
        readonly orders: GetOrderListOutputItem[]
    ){}
}