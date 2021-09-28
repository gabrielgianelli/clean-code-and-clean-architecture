import CpfHelper from './CpfHelper';
import OrderItem from './OrderItem';

export default class Order {
    private constructor(
        public readonly cpf: string,
        private _items: OrderItem[],
        private discountPercent: number
    ) {}
    
    private static isValidCpf(cpf: string): boolean {
        return CpfHelper.isValid(cpf);
    }

    get items(): readonly OrderItem[] {
        return this._items;
    }

    get total(): number {
        const subtotal = this._items.reduce(
            (subtotal, item) => subtotal += item.product.price * item.quantity,
        0);
        return subtotal * (1 - this.discountPercent / 100);
    }

    static create(cpf: string, items: OrderItem[], discountPercent: number = 0): Order {
        return Order.isValidCpf(cpf) ? new Order(cpf, items, discountPercent) : null;
    }
}