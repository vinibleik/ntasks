import { TinyEmitter } from "tiny-emitter";

export default class Ntask extends TinyEmitter {
    public URL: string;

    constructor() {
        super();
        this.URL = "http://localhost:3000/api/v1";
    }
}
