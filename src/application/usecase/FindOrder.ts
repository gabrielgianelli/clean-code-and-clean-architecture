import OrderRepository from "../../domain/repository/OrderRepository";
import FindOrderInput from "../dto/FindOrderInput";
import FindOrderOutput from "../dto/FindOrderOutput";
import FindOrderOutputAssembler from "../dto/FindOrderOutputAssembler";

export default class FindOrder {
    constructor(
        readonly orderRepository: OrderRepository
    ){}

    async execute(findOrderInput: FindOrderInput): Promise<FindOrderOutput> {
        const { orderCode } = findOrderInput
        const order = await this.orderRepository.findByCode(orderCode);
        if(!order) throw new Error('Order not found.');
        return FindOrderOutputAssembler.assembly(order);
    }
}