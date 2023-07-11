import { getRoot } from "../ApiService";
import { createCashedGetFunction } from "../createClient";

const root = getRoot("sales");
const accountsUrl = `${root}/v1/transactions`;

export type ITransactionClient = ReturnType<typeof getTransaction>;

export const getTransaction = () => {
    interface IgetTransaction {
        accountId: string;
        currencyId: string;
        clearCash?: boolean;
    }

    return {
        loadTransaction: async ({ accountId, currencyId, clearCash = false }: IgetTransaction) =>
            createCashedGetFunction<ITransactionClient>({ url: `${accountsUrl}/${accountId}/${currencyId}`, clearCash }),

        reloadTransaction: async ({ accountId, currencyId, clearCash = true }: IgetTransaction) =>
            createCashedGetFunction<ITransactionClient>({ url: `${accountsUrl}/${accountId}/${currencyId}`, clearCash }),
    };
};
