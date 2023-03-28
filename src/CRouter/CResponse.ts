export class CResponse {

    private body : BodyInit;
    private response : ResponseInit;

    constructor() {
        this.body = ""
        this.response = {}
    }

    public status(status: number) {
        this.response.status = status;
        return this;
    }

    public send(data?: BodyInit) {
        if (data)
            return new Response(data, this.response)
        else
            return new Response(data, this.response)
    }
}