export default class CpfHelper {
    private static readonly digitsCount = 11;

    private static isOnlyARepeatedNumber(cpf: string): boolean {
        const [firstDigit] = [...cpf];
        if (cpf.split('').every(digit => digit === firstDigit)) return true;
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

    public static isValid(cpf: string) {
        if (!cpf) return false;
        const sanitizedCpf = this.sanitize(cpf);
        if (sanitizedCpf.length !== this.digitsCount) return false;
        if(this.isOnlyARepeatedNumber(sanitizedCpf)) return false;
        try{  
            const partialCpf = sanitizedCpf.substring(0, sanitizedCpf.length - 2);
            const firstCalculatedVerifyingDigit = this.nextDigit(partialCpf);
            const secondCalculatedVerifyingDigit = this
                .nextDigit(partialCpf + firstCalculatedVerifyingDigit);
            const calculatedVerifyingDigits = 
                `${firstCalculatedVerifyingDigit}${secondCalculatedVerifyingDigit}`;
            const receivedVerifyingDigits = 
                sanitizedCpf.substring(sanitizedCpf.length-2, sanitizedCpf.length);  
            return receivedVerifyingDigits === calculatedVerifyingDigits;
        }catch (e){  
            console.error("Erro !"+e);  
            return false;  
        }  
    }

    public static sanitize(cpf: string): string {
        return cpf.replace(/\D/g, '');
    }
}