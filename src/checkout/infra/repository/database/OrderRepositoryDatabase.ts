import Item from "../../../domain/entity/Item";
import Order from "../../../domain/entity/Order";
import OrderItem from "../../../domain/entity/OrderItem";
import Voucher from "../../../domain/entity/Voucher";
import OrderRepository from "../../../domain/repository/OrderRepository";
import DatabaseConnection from "../../../../shared/infra/database/DatabaseConnection";

export default class OrderRepositoryDatabase implements OrderRepository {
     constructor(
        readonly databaseConnection: DatabaseConnection
     ){}
    
     async save(order: Order): Promise<void> {
        const [existingOrder] = await this.databaseConnection
            .query(`select true from ccca.order where code = $1`, [order.code.value]);
        if (existingOrder) this.update(order);
        else this.insert(order);
    }

    private async insert(order: Order): Promise<void> {
        await this.databaseConnection
            .query(`
                insert into ccca.order (
                    id, voucher, code, cpf, issue_date, shipping_cost, total
                ) values (
                    $1, $2, $3, $4, $5, $6, $7
                )`, [
                    order.id,
                    order.voucher?.name,
                    order.code.value,
                    order.cpf,
                    order.issueDate,
                    order.shippingCost,
                    order.total
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

    private async update(order: Order): Promise<void> {
        await this.databaseConnection.query(`
            update ccca.order
            set voucher = $1,
                cpf = $2,
                issue_date = $3, 
                shipping_cost = $4, 
                total = $5,
                is_canceled = $6,
                cancel_date = $7
            where code = $8`, [
                order.voucher?.name,
                order.cpf,
                order.issueDate,
                order.shippingCost,
                order.total,
                order.isCanceled,
                order.cancelDate,
                order.code.value
            ]);
    }

    async sequence(): Promise<number> {
        const [data] = await this.databaseConnection
            .query(`select nextval(pg_get_serial_sequence('ccca.order', 'id')) as sequence;`, []);
        return parseInt(data.sequence);
    }

    async findByCode(code: string): Promise<Order> {
        const [orderData] = await this.databaseConnection
            .query(`select 
                        id, 
                        voucher, 
                        code, 
                        cpf, 
                        issue_date, 
                        shipping_cost, 
                        total 
                    from ccca.order 
                    where code = $1;`, [
                        code
                    ]);
        const orderItemsData = await this.databaseConnection
            .query(`select 
                        oi.id_order, 
                        oi.id_item, 
                        i.description,
                        oi.price, 
                        oi.width, 
                        oi.depth, 
                        oi.height, 
                        oi.weight, 
                        oi.quantity
                    from ccca.order_item oi
                    join ccca.item i
                    on i.id = oi.id_item
                    where id_order = $1`, [
                        orderData.id
                    ]);
        const orderItems = orderItemsData.map((item: any): OrderItem => OrderItem.create(new Item(
            item.id,
            item.description,
            item.price,
            item.width,
            item.depth,
            item.height,
            item.weight
        ), item.quantity));
        const [voucherData] = await this.databaseConnection
            .query('select * from ccca.voucher where name = $1', [orderData.voucher]);
        let voucher;
        if (voucherData) voucher = new Voucher(voucherData.name, voucherData.percentage, voucherData.expire_date);
        return Order.create(
            orderData.id, 
            orderData.cpf, 
            orderItems, 
            orderData.shipping_cost, 
            voucher, 
            orderData.issue_date
        );
    }
}