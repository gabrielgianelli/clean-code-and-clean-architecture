import Item from './Item';

export default class OrderItem {
    private constructor(
        readonly description: string,
        readonly price: number,
        private _quantity: number
    ) {}

    static create(item: Item, quantity: number): OrderItem {
        return new OrderItem(item.description, item.price, quantity);
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity(quantity: number) {
        this._quantity = quantity;
    }

    total(): number {
        return this._quantity * this.price;
    }
}