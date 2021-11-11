import CpfHelper from './CpfHelper';
import OrderItem from './OrderItem';
import OrderCode from './OrderCode';
import Voucher from './Voucher';

export default class Order {
    private _isCanceled: boolean;
    private _cancelDate: Date | undefined;

    private constructor(
        readonly id: number,
        readonly cpf: string,
        private _items: OrderItem[],
        private _voucher: Voucher | null,
        readonly issueDate: Date,
        readonly code: OrderCode,
        readonly shippingCost: number,
    ) {
        this._isCanceled = false;
    }
    
    private static isValid(cpf: string): boolean {
        return CpfHelper.isValid(cpf);
    }

    get items(): readonly OrderItem[] {
        return this._items;
    }

    get voucher(): Voucher | null {
        if (!this._voucher) return null;
        return new Voucher(
            this._voucher.name,
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
 
    cancel(cancelDate: Date = new Date()): void {
        if (this._isCanceled) throw new Error('Order already canceled.');
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const issueAgeDays = (cancelDate.getTime() - this.issueDate.getTime()) / millisecondsPerDay;
        const cancelDeadlineDays = 7;
        if (issueAgeDays > cancelDeadlineDays) {
            throw new Error('Order can not be canceled');
        }
        this._isCanceled = true;
        this._cancelDate = cancelDate;
    }

    get isCanceled(): boolean {
        return this._isCanceled;
    }

    get cancelDate(): Date | undefined {
        return this._cancelDate;
    }

    static create(
            sequence: number,
            cpf: string, 
            items: OrderItem[], 
            shippingCost: number,
            voucher: Voucher | null = null,
            issueDate: Date = new Date()
        ): Order {
        const orderCode = new OrderCode(issueDate, sequence);
        if (!Order.isValid(cpf)) throw new Error('CPF is not valid.');
        return new Order(sequence, cpf, items, voucher, issueDate, orderCode, shippingCost);
    }
}