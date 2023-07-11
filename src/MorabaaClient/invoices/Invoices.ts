import { getRoot } from "../ApiService";
import { createCashedGetFunction, createLoadCleint } from "../createClient";

const root = getRoot("invoices");
const invoicesUrl = `${root}/v1/history`;
const invoiceUrl = `${root}/v1/invoices`;

export type IVoicesClient = ReturnType<typeof getInvoicesClient>;

export const getInvoicesClient = () => {
    return {
        ...createLoadCleint<any, any>({ url: invoicesUrl }),
        getInvoice: async (invoiceId: string | number) => createCashedGetFunction({ url: `${invoiceUrl}/${invoiceId}` }),
    };
};
