import { Utils } from "morabaa-utils";
import { getRoot } from "../ApiService";
import { createCashedGetFunction, createLoadCleint, createPostFunction } from "../createClient";

const root = getRoot("sales");
const getStorage: any = (key: string) => JSON.parse(localStorage.getItem(key));
const myAccountsUrl = `${root}/v1/businesses/ofclient/${getStorage("owner")?.phone_number}`;

export type IMyAccountsClient = ReturnType<typeof getMyAccountsClient>;

const getMyAccountsClient = () => {
    return {
        // for adding these functions [load, loadMore, reload]
        ...createLoadCleint({ url: myAccountsUrl }),
        // load: async () => createLoadCleint({ url: customersUrl }),
        // reload: async () => createLoadCleint({ url: customersUrl }),
        // loadMore: async () => createLoadCleint({ url: customersUrl }),
    };
};
export default getMyAccountsClient;
