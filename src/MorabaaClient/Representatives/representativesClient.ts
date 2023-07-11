import { getRoot } from "../ApiService";
import { createCashedGetFunction, createDeleteFunction, createLoadCleint, createPostFunction, createUpdateFunction } from "../createClient";
import { IAccount } from "../types";
import {
    IPermissionsDTO,
    IPermissionsResponse,
    IRepresentativeDTO,
    IRepresentativeEditDTO,
    IReps,
    IRepsPararms,
    IStore,
    IUpdateAccountByQuery,
    IUpdateAccountData,
    IUpdateStoreData,
} from "./types";

const repsRoot = getRoot("reps");
const itemsRoot = getRoot("items");
const hubRoot = getRoot("hub");
const salesRoot = getRoot("sales");

const businessAccountsUrl = `${salesRoot}/v1/accounts`;

const repsStoreUrl = `${repsRoot}/v1/stores`;
const repsAccountsUrl = `${repsRoot}/v1/accounts`;
const repsPermissions = `${repsRoot}/v1/permissions`;

const repsUrl = `${hubRoot}/v1/representatives`;
const businessStoresUrl = `${itemsRoot}/v1/stores/ofbusiness`;

export type IRepresentativesClient = ReturnType<typeof getRepresentativesClient>;

const getRepresentativesClient = () => {
    return {
        ...createLoadCleint<IRepsPararms, IAccount[]>({ url: businessAccountsUrl }),
        businessStores: async ({ businessId, clearCash = false }) =>
            createCashedGetFunction<IStore[]>({ url: `${businessStoresUrl}/${businessId}`, clearCash }),
        repsStores: async ({ representativeId, clearCash = false }) =>
            createCashedGetFunction<IStore[]>({ url: `${repsStoreUrl}/${representativeId}`, clearCash }),
        businessReps: async ({ businessId, clearCash = false }) => createCashedGetFunction<IReps[]>({ url: `${repsUrl}/ofbusiness/${businessId}`, clearCash }),

        repsAccounts: async ({ representativeId, clearCash = false, body }) =>
            createPostFunction<IAccount[]>({
                url: `${repsAccountsUrl}/ofrep/${representativeId}`,
                clearCash,
                body,
            }),
        getRepresentative: async ({ representativeId, clearCash = true }) =>
            createCashedGetFunction<IReps>({
                url: `${repsUrl}/${representativeId}`,
                clearCash,
            }),
        repsPermissions: async ({ representativeId, clearCash = true }) =>
            createCashedGetFunction<IPermissionsResponse[]>({ url: `${repsPermissions}/ofrepresentative/${representativeId}`, clearCash }),

        updateRepsStores: async ({ data, clearCash = false }: { clearCash?: boolean; data: IUpdateStoreData }) =>
            createPostFunction<any>({ url: `${repsStoreUrl}`, body: data, clearCash }),
        updateRepsAccounts: async ({ data, clearCash = false }: { clearCash?: boolean; data: IUpdateAccountData }) =>
            createPostFunction<any>({ url: `${repsAccountsUrl}`, body: data, clearCash }),
        updateRepsAccountByQuery: async ({ data, clearCash = false }: { clearCash?: boolean; data: IUpdateAccountByQuery }) =>
            createPostFunction<any>({ url: `${repsAccountsUrl}/byquery`, body: data, clearCash }),

        addRepresentative: async ({ data, clearCash = false, businessId }: { clearCash?: boolean; data: IRepresentativeDTO; businessId: string }) =>
            createPostFunction<IReps>({ url: `${repsUrl}/ofbusiness/${businessId}`, body: data, clearCash }),

        updateRepresentative: async ({
            data,
            clearCash = false,
            representativeId,
        }: {
            clearCash?: boolean;
            data: IRepresentativeEditDTO;
            representativeId: string;
        }) => createUpdateFunction<any>({ url: `${repsUrl}/${representativeId}`, body: data, clearCash }),
        deleteRepresentative: async ({ representativeId, clearCash = false }: { clearCash?: boolean; representativeId: string }) =>
            createDeleteFunction<any>({ url: `${repsUrl}/${representativeId}`, clearCash }),

        addPermissions: async ({ data, clearCash = false }: { clearCash?: boolean; data: IPermissionsDTO }) =>
            createPostFunction<any>({ url: `${repsPermissions}`, body: data, clearCash }),

        deleteAllRepsAccounts: async ({ representativeId, clearCash = false }) =>
            createDeleteFunction<any>({ url: `${repsAccountsUrl}/ofrep/${representativeId}/all`, clearCash }),
    };
};

export default getRepresentativesClient;
