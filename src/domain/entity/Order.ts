import CpfHelper from './CpfHelper';
import OrderItem from './OrderItem';
import Voucher from './Voucher';

const DISTANCE: number = 1000;
const MINIMUM_SHIPPING_COST: number = 10;

export default class Order {
    private constructor(
        readonly cpf: string,
        private _items: OrderItem[],
        private _voucher: Voucher | null,
        readonly issueDate: Date
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
            this._voucher.discountPercentage(this.issueDate), 
            this._voucher.expirationDate
        );
    }

    get total(): number {
        const subtotal = this._items.reduce(
            (subtotal, orderItem) => subtotal += orderItem.subtotal(),
        0);
        const discountPercentage = this._voucher?.discountPercentage(this.issueDate) ?? 0;
        return (subtotal + this.shippingCost) * (1 - discountPercentage / 100);
    }
    
    get shippingCost(): number {
        const shippingCost = this._items.reduce(
            (shippingCost, orderItem) => shippingCost += orderItem.shippingCost(DISTANCE),
        0);
        if(shippingCost < MINIMUM_SHIPPING_COST) return MINIMUM_SHIPPING_COST;
        return shippingCost;
    }

    static create(
            cpf: string, 
            items: OrderItem[], 
            voucher: Voucher | null = null,
            issueDate: Date = new Date()
        ): Order | null {
        return Order.isValid(cpf) ? new Order(cpf, items, voucher, issueDate) : null;
    }
}