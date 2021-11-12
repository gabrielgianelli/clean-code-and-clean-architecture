import GetOrderOutput from "../dto/GetOrderOutput";
import OrderDAO from "./OrderDAO";

export default class GetOrder {
    constructor(
        readonly orderDAO: OrderDAO
    ){}

    async execute(orderCode: string): Promise<GetOrderOutput> {
        return await this.orderDAO.getOrder(orderCode);
    }
}