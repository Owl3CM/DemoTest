import { getRoot } from "../ApiService";
import { createLoadCleint } from "../createClient";

const root = getRoot("items");
const businessesUrl = `${root}/v1/items/ofowner`;

export type IRestaurnatClient = ReturnType<typeof getRestaurantClient>;

export const getRestaurantClient = () => {
    return {
        ...createLoadCleint<any, any>({ url: businessesUrl }),
    };
};
