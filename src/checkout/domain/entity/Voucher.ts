export default class Voucher {
    constructor(
        readonly name: string,
        private _discountPercentage: number,
        private _expirationDate?: Date
    ){
        if (this._discountPercentage < 0  || this._discountPercentage > 100) {
            throw new Error('Discount must be a valid percentage.');
        }
    }

    get expirationDate(): Date | undefined {
        if (!this._expirationDate) return undefined;
        return new Date(
            this._expirationDate.getFullYear(),
            this._expirationDate.getMonth(),
            this._expirationDate.getDate()
        );
    }

    isValid(today: Date = new Date()): boolean {
        return this.expirationDate ? today <= this.expirationDate : true;
    }

    discountPercentage(today: Date = new Date()): number {
        return this.isValid(today) ? this._discountPercentage : 0;
    }
}