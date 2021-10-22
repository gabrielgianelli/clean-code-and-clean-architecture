import OrderRepository from '../repository/OrderRepository';
import ItemRepository from '../repository/ItemRepository';
import VoucherRepository from '../repository/VoucherRepository';

export default interface AbstractRepositoryFactory {
    createOrderRepository(): OrderRepository;
    createItemRepository(): ItemRepository;
    createVoucherRepository(): VoucherRepository;
}