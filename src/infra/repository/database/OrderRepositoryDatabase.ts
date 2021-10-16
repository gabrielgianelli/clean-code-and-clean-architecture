import Item from "../../../domain/entity/Item";
import Order from "../../../domain/entity/Order";
import OrderItem from "../../../domain/entity/OrderItem";
import OrderRepository from "../../../domain/repository/OrderRepository";
import DatabaseConnection from "../../database/DatabaseConnection";
import VoucherRepositoryDatabase from "./VoucherRepositoryDatabase";

export default class OrderRepositoryDatabase implements OrderRepository {
     constructor(
        readonly databaseConnection: DatabaseConnection
     ){}

    async save(order: Order): Promise<void> {
        await this.databaseConnection
            .query(`
                insert into ccca.order (
                    id, voucher, code, cpf, issue_date, shipping_cost
                ) values (
                    $1, $2, $3, $4, $5, $6
                )`, [
                    order.id,
                    order.voucher?.name,
                    order.code.value,
                    order.cpf,
                    order.issueDate,
                    order.shippingCost
                ]);
        order.items.forEach(async (item) => {
            await this.databaseConnection
                .query(`
                    insert into ccca.order_item (
                        id_order, id_item, price, width, depth, height, weight, quantity
                    ) values (
                        $1, $2, $3, $4, $5, $6, $7, $8
                    )`, [
                        order.id,
                        item.id,
                        item.price,
                        item.widthCentimeters,
                        item.depthCentimeters,
                        item.heightCentimeters,
                        item.weightKilograms,
                        item.quantity
                    ]);
        });        
    }

    async sequence(): Promise<number> {
        const [data] = await this.databaseConnection
            .query(`select nextval(pg_get_serial_sequence('ccca.order', 'id')) as sequence;`, []);
        return parseInt(data.sequence);
    }

    async findByCode(orderCode: string): Promise<Order | null> {
        const [orderData] = await this.databaseConnection
            .query(`
                select 
                    id,
                    voucher,
                    cpf,
                    issue_date
                from ccca.order
                where code = $1
            `, [orderCode]);
        const voucherRepository = new VoucherRepositoryDatabase(this.databaseConnection);
        const voucher = await voucherRepository.findByName(orderData.voucher);
        const orderItems = await this.findItemsByOrderId(orderData.id);
        const order = Order.create(
            orderData.id, 
            orderData.cpf, 
            orderItems, 
            voucher, 
            orderData.issue_date
        );
        return order;
    }

    private async findItemsByOrderId(id: number): Promise<OrderItem[]> {
        const orderItemsData = await this.databaseConnection
            .query(`
                select 
                    order_item.id_item, 
                    item.description, 
                    order_item.price, 
                    order_item.width, 
                    order_item.depth, 
                    order_item.height, 
                    order_item.weight, 
                    order_item.quantity
                from ccca.order_item as order_item 
                join ccca.item as item
                on item.id = order_item.id_item
                where order_item.id_order = $1
                order by order_item.id_item
                `, [id]);
        let orderItems: OrderItem[] = [];
        orderItemsData.forEach((orderItemData: any) => {
            const item = new Item(
                orderItemData.id_item,
                orderItemData.description,
                orderItemData.price,
                orderItemData.width,
                orderItemData.depth,
                orderItemData.height,
                orderItemData.weight
            );
            const orderItem = OrderItem.create(item, orderItemData.quantity)
            orderItems.push(orderItem);
        });
        return orderItems;
    }
}