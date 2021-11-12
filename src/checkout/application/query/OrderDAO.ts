import GetOrderItemOutput from "../dto/GetOrderItemOutput";
import GetOrderOutput from "../dto/GetOrderOutput";

export default interface OrderDAO {
    getOrder(code: string): Promise<GetOrderOutput>
    getOrderItems(id: number): Promise<GetOrderItemOutput[]>
    getOrders(): Promise<GetOrderOutput[]>;
}