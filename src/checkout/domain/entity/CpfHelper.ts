export default class CpfHelper {
    private static readonly digitsCount = 11;

    private static isOnlyARepeatedNumber(cpf: string): boolean {
        const [firstDigit] = cpf;
        if ([...cpf].every(digit => digit === firstDigit)) return true;
        return false;
    }

    private static nextDigit(partialCpf: string): number {
        const digits = partialCpf.split('').map(Number);
        const digitsTotal = digits.reduce((subtotal, digit, index) => 
            subtotal += ((digits.length + 2) - (index + 1)) * digit,
        0);
        const remainder = digitsTotal % this.digitsCount;
        return remainder < 2 ? 0 : this.digitsCount - remainder;
    }

    public static isValid(rawCPF: string) {
        if (!rawCPF) return false;
        const cpf = this.sanitize(rawCPF);
        if (cpf.length !== this.digitsCount) return false;
        if(this.isOnlyARepeatedNumber(cpf)) return false;
        const partialCpf = cpf.substring(0, cpf.length - 2);
        const firstCalculatedCheckDigit = this.nextDigit(partialCpf);
        const secondCalculatedCheckDigit = this
            .nextDigit(`${partialCpf}${firstCalculatedCheckDigit}`);
        const calculatedCheckDigits = 
            `${firstCalculatedCheckDigit}${secondCalculatedCheckDigit}`;
        const receivedCheckDigits = cpf.substring(cpf.length - 2, cpf.length);
        return receivedCheckDigits === calculatedCheckDigits;
    }

    public static sanitize(cpf: string): string {
        return cpf.replace(/\D/g, '');
    }
}