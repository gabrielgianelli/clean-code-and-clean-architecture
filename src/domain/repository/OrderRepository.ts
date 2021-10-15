import Order from "../entity/Order";

export default interface OrderRepository {
    sequence(): Promise<number>
    save(order: Order): Promise<void>
    findByCode(orderCode: string): Promise<Order | null>
}