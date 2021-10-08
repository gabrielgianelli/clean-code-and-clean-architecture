import Item from './Item';

export default class OrderItem {
    private constructor(
        readonly id: number,
        readonly description: string,
        readonly price: number,
        readonly widthCentimeters: number,
        readonly depthCentimeters: number,
        readonly heightCentimeters: number,
        readonly weightKilograms: number,
        private _quantity: number
    ) {}

    static create(item: Item, quantity: number): OrderItem {
        return new OrderItem(
            item.id,
            item.description, 
            item.price, 
            item.widthCentimeters,
            item.depthCentimeters, 
            item.heightCentimeters, 
            item.weightKilograms, 
            quantity
        );
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity(quantity: number) {
        this._quantity = quantity;
    }

    volume(): number {
        return this.widthCentimeters * this.depthCentimeters * this.heightCentimeters;
    }

    density(): number {
        return this.weightKilograms / this.volume();
    }

    subtotal(): number {
        return this._quantity * this.price;
    }

    shippingCost(distance: number) {
        return distance * this.volume() * (this.density() / 100) * this._quantity;
    }
}