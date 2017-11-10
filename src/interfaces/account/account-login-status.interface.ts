import { EpicAccount } from "./epic-account.interface";

export interface AccountLoginStatus {

    result? : boolean
    epicAccount? : EpicAccount;
    error? : {
        message: string;
    }
}