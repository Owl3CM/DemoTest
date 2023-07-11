import { getRoot } from "../ApiService";
import { createLoadCleint } from "../createClient";

const root = getRoot("sales");
const businessesUrl = `${root}/v2/nets`;

export type IHomeClient = ReturnType<typeof getHomeClient>;

export const getHomeClient = () => {
    return {
        ...createLoadCleint<any, any>({ url: businessesUrl }),
    };
};
