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
        throw new Error('Not implemented');
    }

    isValidCpf(): boolean {
        throw new Error('Not implemented');
    }
}