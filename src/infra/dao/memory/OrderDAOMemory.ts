import GetOrderItemOutput from '../../../application/dto/GetOrderItemOutput';
import GetOrderOutput from '../../../application/dto/GetOrderOutput';
import OrderDAO from '../../../application/query/OrderDAO';

export default class OrderDAOMemory implements OrderDAO {
    constructor(){}

    async getOrder(code: string): Promise<GetOrderOutput> {
        return new GetOrderOutput(
            '202100000001', 
            '89207883082', 
            new Date(2021, 9, 11),
            await this.getOrderItems(Number(code) % 10), 
            30, 
            4330
        );
    }

    async getOrderItems(id: number): Promise<GetOrderItemOutput[]> {
        switch (id) {
            case 1: return [new GetOrderItemOutput('PlayStation 5', 4300, id)];
            case 2: return [new GetOrderItemOutput('Nintendo Switch', 2300, id)];
            default: return [new GetOrderItemOutput('Notebook', 6700, id)];
        }
    }

    async getOrders(): Promise<GetOrderOutput[]> {
        const order1 = await this.getOrder('202100000001');
        const order2 = await this.getOrder('202100000002');
        const order3 = await this.getOrder('202100000003');
        return [ order1, order2, order3 ];
    }
}