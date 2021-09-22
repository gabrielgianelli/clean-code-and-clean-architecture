import { Product } from './Product.js';

export class OrderItem {
    constructor(
        private _product: Product,
        public readonly quantity: number
    ) {}

    get product(): Product {
        return new Product(
            this._product.description, 
            this._product.price
        );
    }
}