import { Url } from "url";

export class Configuration {
    apiUrl: string | undefined;

    constructor(apiUrl: string){
        this.apiUrl = apiUrl;
    }
}