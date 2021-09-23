import { OrderItem } from './OrderItem';

export class Order {
    constructor(
        public readonly cpf: string,
        private _items: OrderItem[],
        private discountPercent: number = 0
    ) {}

    get items(): readonly OrderItem[] {
        return this._items;
    }

    get total(): number {
        const subtotal = this._items.reduce(
            (subtotal, item) => subtotal += item.product.price * item.quantity,
        0);
        return subtotal * (1 - this.discountPercent / 100);
    }

    isValidCpf(): boolean {
        throw new Error('Not implemented');
    }
}