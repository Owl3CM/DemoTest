import { getRoot } from "../ApiService";
import { IAccount } from "../Representatives/types";
import { createCashedGetFunction, createLoadCleint } from "../createClient";
import { IItem } from "../items";

const itemsRoot = getRoot("items");
const salesRoot = getRoot("sales");

const itemsUrl = `${itemsRoot}/v1/items/ofowner`;

const salesAccountsUrl = `${salesRoot}/v1/accounts`;

export type IRepresentativesClient = ReturnType<typeof getSalesClient>;

const getSalesClient = () => {
    return {
        ...createLoadCleint<any, IAccount[]>({ url: salesAccountsUrl }),
        getItems: async ({ businessId, clearCash = false }) => createCashedGetFunction<IItem[]>({ url: `${itemsUrl}/${businessId}`, clearCash }),
        getAccount: async ({ accountId, clearCash = false }) => createCashedGetFunction<IAccount>({ url: `${salesAccountsUrl}/${accountId}`, clearCash }),
    };
};

export default getSalesClient;
