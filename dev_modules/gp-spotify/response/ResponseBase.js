



// Use the MDN documentation for Response to understand the properties and methods available for handling HTTP responses.
export default class ResponseBase {

    body;


    constructor(body) {
        this.body = body;
    }

    get body() {
        return this.body;
    }

}