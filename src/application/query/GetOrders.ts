import GetOrderOutput from "../dto/GetOrderOutput";
import OrderDAO from "./OrderDAO";

export default class GetOrders {
    constructor(
        readonly orderDAO: OrderDAO
    ){}
    
    async execute(): Promise<GetOrderOutput[]> {
        return await this.orderDAO.getOrders();
    }
}