import { getRoot } from "../ApiService";
import { createCashedGetFunction, createLoadCleint, createPostFunction } from "../createClient";
import { IItem, IItemsQuery } from "./types";

const root = getRoot("items");
const itemsUrl = `${root}/v1/items/ofowner`;
const lastUpdateUrl = `${root}/v1/lastupdates/ofbusiness`;
const itemsCount = `${root}/v1/items/ofowner/count`;

export type IItemsClient = ReturnType<typeof getItemsClient>;

export type ItemsCountResponse = number;

const getItemsClient = () => {
    return {
        // for adding these functions [load, loadMore, reload]
        ...createLoadCleint<IItemsQuery, IItem[]>({ url: itemsUrl }),
        lastUpdate: async ({ businessId, clearCash = false }) => createCashedGetFunction<string>({ url: `${lastUpdateUrl}/${businessId}`, clearCash }),
        itemsCount: async ({ businessId, clearCash = false }) =>
            createCashedGetFunction<ItemsCountResponse>({ url: `${itemsCount}?businessId=${businessId}`, clearCash }),
        add: (item: IItem) => createPostFunction<IItem[]>({ url: itemsUrl, body: [item] }),
        edit: (item: IItem) => createPostFunction<IItem>({ url: itemsUrl, body: item }),
    };
};
export default getItemsClient;
