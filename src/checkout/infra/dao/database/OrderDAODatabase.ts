import GetOrderItemOutput from '../../../application/dto/GetOrderItemOutput';
import GetOrderOutput from '../../../application/dto/GetOrderOutput';
import OrderDAO from '../../../application/query/OrderDAO';
import DatabaseConnection from "../../../../shared/infra/database/DatabaseConnection";

export default class OrderDAODatabase implements OrderDAO {
    constructor(
        readonly databaseConnection: DatabaseConnection
    ){}

    async getOrder(code: string): Promise<GetOrderOutput> {
        const [orderData] = await this.databaseConnection
            .query(`
                select 
                    id,
                    code,
                    cpf,
                    issue_date,
                    shipping_cost::int,
                    total::int
                from ccca.order
                where code = $1
                `, [code]);
        const orderItems = await this.getOrderItems(orderData.id);
        const order = new GetOrderOutput(
            orderData.code,
            orderData.cpf,
            orderData.issue_data,
            orderItems,
            orderData.shipping_cost,
            orderData.total
        );
        return order;
    }

    async getOrderItems(id: number): Promise<GetOrderItemOutput[]> {
        const orderItemsData = await this.databaseConnection
            .query(`
                select 
                    item.description, 
                    order_item.price::int, 
                    order_item.quantity::int
                from ccca.order_item as order_item 
                join ccca.item as item
                on item.id = order_item.id_item
                where order_item.id_order = $1
                order by order_item.id_item
                `, [id]);
        let orderItems: GetOrderItemOutput[] = [];
        orderItemsData.forEach((orderItemData: any) => {
            orderItemsData.push(new GetOrderItemOutput(
                orderItemData.description, orderItemData.price, orderItemData.quantity
            ));
        });
        return orderItems;
    }

    async getOrders(): Promise<GetOrderOutput[]> {
        const ordersData = await this.databaseConnection.query(`select * from ccca.order order by id`, []);
        return await Promise.all(ordersData.map(async (orderData: any) => {
            const orderItems = await this.getOrderItems(orderData.id);
            const order = new GetOrderOutput(
                orderData.code,
                orderData.cpf,
                orderData.issue_data,
                orderItems,
                orderData.shipping_cost,
                orderData.total
            );
            return order;
        }));
    }
}