export default class Voucher {
    constructor(
        private _discountPercentage: number,
        private _expirationDate: Date
    ){}

    get expirationDate(): Date {
        return new Date(
            this._expirationDate.getFullYear(),
            this._expirationDate.getMonth(),
            this._expirationDate.getDate()
        );
    }

    get discountPercentage(): number {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if(this.expirationDate < today) return 0;
        return this._discountPercentage;
    }
}