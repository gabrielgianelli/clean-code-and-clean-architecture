import OrderRepository from "../../domain/repository/OrderRepository";
import GetOrderListOutput from "../dto/GetOrderListOutput";

export default class GetOrderList {
    constructor(
        readonly orderRepository: OrderRepository
    ){}
    
    async execute(): Promise<GetOrderListOutput> {
        const orders = await this.orderRepository.list();
        const orderList = orders.map(order => {
            return {
                code: order.code.value,
                cpf: order.cpf,
                issueDate: order.issueDate,
                total: order.total
            }
        });
        return new GetOrderListOutput(orderList);
    }

}