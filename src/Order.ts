import CpfHelper from './CpfHelper';
import OrderItem from './OrderItem';
import Voucher from './Voucher';

const DISTANCE: number = 1000;
const MINIMUM_SHIPPING_COST: number = 10;

export default class Order {
    private constructor(
        readonly cpf: string,
        private _items: OrderItem[],
        private _voucher: Voucher | null
    ) {}
    
    private static isValid(cpf: string): boolean {
        return CpfHelper.isValid(cpf);
    }

    get items(): readonly OrderItem[] {
        return this._items;
    }

    get voucher(): Voucher | null {
        if (!this._voucher) return null;
        return new Voucher(
            this._voucher.discountPercentage, 
            this._voucher.expirationDate
        );
    }

    get total(): number {
        const subtotal = this._items.reduce(
            (subtotal, orderItem) => subtotal += orderItem.total(),
        0);
        let shippingCost = this._items.reduce(
            (shippingCost, orderItem) => shippingCost += orderItem.shippingCost(DISTANCE),
        0);
        if(shippingCost < MINIMUM_SHIPPING_COST) shippingCost = MINIMUM_SHIPPING_COST;
        const discountPercentage = this._voucher?.discountPercentage ?? 0;
        return (subtotal + shippingCost) * (1 - discountPercentage / 100);
    }

    static create(cpf: string, items: OrderItem[], voucher: Voucher | null = null): Order | null {
        return Order.isValid(cpf) ? new Order(cpf, items, voucher) : null;
    }
}