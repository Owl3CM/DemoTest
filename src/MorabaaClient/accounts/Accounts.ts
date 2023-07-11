import { IAccount, IAccountsQueryParams } from "../types";
import { getRoot } from "../ApiService";
import { createCashedGetFunction, createLoadCleint as createCashedLoadCleint, createPostFunction } from "../createClient";
import { IAccountsCountResponse, ILastUpdateProps, ILastUpdateResponse } from "./types";

const root = getRoot("sales");
const accountsUrl = `${root}/v1/accounts`;
const lastUpdateUrl = `${root}/v1/lastupdates/ofbusiness`;
const accountsCountUrl = `${root}/v1/accounts/count`;

export type IAccountClient = ReturnType<typeof getAccountsClient>;

export const getAccountsClient = () => {
    return {
        // for adding these functions [load, loadMore, reload]
        ...createCashedLoadCleint<IAccountsQueryParams, IAccount[]>({ url: accountsUrl }),

        lastUpdate: async ({ businessId, clearCash = false }: ILastUpdateProps) =>
            createCashedGetFunction<ILastUpdateResponse>({ url: `${lastUpdateUrl}/${businessId}`, clearCash }),

        accountsCount: async ({ clearCash = false }: ILastUpdateProps | undefined) =>
            createCashedGetFunction<IAccountsCountResponse>({ url: `${accountsCountUrl}`, clearCash }),

        add: (account: IAccount) => createPostFunction<IAccount[]>({ url: accountsUrl, body: [account] }),
        edit: (account: IAccount) => createPostFunction<IAccount>({ url: accountsUrl, body: account }),
    };
};
