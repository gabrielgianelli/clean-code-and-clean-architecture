export default class OrderCode {
    readonly value: string;

    constructor(
        private date: Date,
        private sequence: number
    ){
        const year = this.date.getFullYear();
        const sequence8char = `${this.sequence}`.padStart(8, '0');
        this.value = `${year}${sequence8char}`;
    }
}