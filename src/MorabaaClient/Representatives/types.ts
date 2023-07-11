import { IPermission } from "@/pages/Representatives/types";

export interface IRepsPararms {
    businessId: string;
    representativeId: string;
    q?: string;
}
export interface IBalance {
    amount: number;
    currencyId: number;
    state: string;
}

export interface IAccount {
    id: string;
    businessId: string;
    businessTitle: string;
    morabaaId: number;
    name: string;
    accountId: number;
    mainId: number;
    phoneNumber: string;
    address: string;
    balances: IBalance[];
    longitude: number;
    latitude: number;
    checked?: true | false | 1 | 0;
}

export interface IReps {
    addedAt: string;
    address: string;
    businessId: string;
    deleted: boolean;
    firstName: string;
    id: string;
    image: null | string;
    isActive: boolean;
    lastName: string;
    phoneNumber: string;
}

export interface IStore {
    businessId: string;
    deleted: boolean;
    id: string;
    morabaaId: string;
    title: string;
    checked?: true | false | 1 | 0;
}
export interface IUpdateStoreData {
    businessId: string;
    representativeId: string;
    storesIds: string[];
}
export interface IUpdateAccountData {
    businessId: string;
    representativeId: string;
    accountsIdsToAdd: string[];
    accountsIdsToRemove: string[];
}
export interface IUpdateAccountByQuery {
    businessId: string;
    representativeId: string;
    searchQuery: string;
}

export interface IRepresentativeDTO {
    first_name: string;
    last_name: string;
    phone_number: string;
    address: string;
    password?: string;
    passwordConfirm?: string;
    isActive?: boolean;
}
export interface IRepresentativeEditDTO {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    isActive?: boolean;
}

export interface IRepsPost {
    representative: IRepresentativeDTO;

    permissions: IPermission[];
}
export interface IPermissionKeys {
    CAN_GIVE_DISCOUNTS: boolean;
    CAN_HAVE_UNPAID_AMOUNT: boolean;
    CAN_SELL_BEYOND_50METERS: boolean;
    CAN_USE_NON_GENERAL_PRICES: boolean;
    CAN_SEND_WITHOUT_LOCATION: boolean;
    CAN_SELL_OUT_OF_STOCK: boolean;
}
export interface IPermissionsDTO {
    representativeId: string;
    permissions: {
        key: string;
        isPermitted: boolean;
    }[];
}
export interface IPermissionsResponse {
    id: string;
    deleted: boolean;
    createdAt: string;
    representativeId: string;
    addedAt: string;
    key: keyof IPermissionKeys;
    isPermitted: boolean;
}
