import { getRoot } from "../ApiService";
import { createCashedGetFunction, createLoadCleint, createPostFunction } from "../createClient";
import { IAddBond, IBondsParams, ILoadBondsProps } from "./types";

const root = getRoot("notifications");
const bondsUrl = `${root}/v1/business/`;

export type IBondsClinet = ReturnType<typeof getBondsClient>;

export const getBondsClient = () => {
    const _bond = {
        ...createLoadCleint<IBondsParams, any>({ url: bondsUrl }),
        addBond: ({ body, clearCash, params }: IAddBond) => createPostFunction({ url: bondsUrl, body, clearCash, params }),
        loadBond: ({ id, clearCash }: ILoadBondsProps) => createCashedGetFunction({ url: `${bondsUrl}/${id}`, clearCash }),
        reloadBond: ({ id }: ILoadBondsProps) => _bond.loadBond({ id, clearCash: true }),
    };
    return _bond;
};
