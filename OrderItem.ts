import { Item } from './Item';

export class OrderItem {
    constructor(
        private _item: Item,
        public readonly quantity: number
    ) {}

    get product(): Item {
        return new Item(
            this._item.description, 
            this._item.price
        );
    }
}