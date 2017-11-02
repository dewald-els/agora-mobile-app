import { EpicAccount } from "./epic-account.interface";

export interface AccountLoginStatus {

    result? : boolean
    account? : EpicAccount;
    error? : {
        message: string;
    }
}