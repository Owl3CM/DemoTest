import { IQuery } from "../queries";
import { IAccount } from "../types";

export interface IAccountsQuery extends IQuery {
    name?: string;
    accountId?: number;
}

export interface ILastUpdateProps {
    businessId?: string;
    clearCash?: boolean;
}
export interface ILastUpdateResponse {
    businessId: string;
    updatedAt: string;
    id: string;
}
export interface IAccountsCountResponse {
    [key: string]: number;
}
