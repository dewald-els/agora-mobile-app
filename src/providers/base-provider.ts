import { AgoraCacheProvider } from "./agora-cache/agora-cache.provider";

export abstract class BaseProvider {

    protected storageKey : string;
    protected baseUrl: string = "https://api.agora.gg/";

    constructor(){
    }
}