import { getRoot } from "../ApiService";
import { createLoadCleint, createCashedGetFunction, createPostFunction } from "../createClient";
import { IBusinessResponse, IBusinessesQuery } from "./types";
const root = getRoot("hub");
const businessesUrl = `${root}/v1/businesses`;

export type IBusinessesClient = ReturnType<typeof getBusinessesClient>;

interface IGetBusinesses {
    businessId: string;
    clearCash?: boolean;
}

interface IRemoveOwnershipProps {
    businessId: string;
    password: string;
}

export const getBusinessesClient = () => {
    const businessClient = {
        ...createLoadCleint<any, any>({ url: `${businessesUrl}` }),

        loadBuseiness: async ({ businessId, clearCash = false }: IGetBusinesses) =>
            createCashedGetFunction<IBusinessResponse>({ url: `${businessesUrl}/${businessId}`, clearCash }),

        reloadBuseiness: async ({ businessId }: IGetBusinesses) => businessClient.load({ businessId, clearCash: true }),

        removeOwnership: async ({ businessId, password }: IRemoveOwnershipProps) =>
            createPostFunction({ url: `${businessesUrl}/remove-ownership`, body: { password } }),
    };
    return businessClient;
};
