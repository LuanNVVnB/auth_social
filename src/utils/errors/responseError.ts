export class ResponseCustom {
    private readonly code: string;
    private readonly message: string;
    constructor(code: string, message: string) {
        this.code = code;
        this.message = message;
    }
    get() {
        return {
            code: this.code,
            message: this.message,
        };
    }
}
