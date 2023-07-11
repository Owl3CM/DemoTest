import { IQuery } from "./queries";

export interface IAccountsQueryParams extends IQuery {
    name?: string;
    accountId?: number;
}

export interface IAccount {
    id: string;
    name: string;
    accountId?: number;
    mainId: number;
    morabaaId: number;
    businessId: string;
    phoneNumber: string;
    address: string;
    latitude: number;
    longitude: number;
    deleted: boolean;
    checked?: true | false | 1 | 0;
}
