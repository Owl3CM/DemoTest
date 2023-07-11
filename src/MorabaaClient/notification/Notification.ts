import { getRoot } from "../ApiService";
import { createLoadCleint } from "../createClient";

const root = getRoot("notifications");
const accountsUrl = `${root}/v1/business/`;

export interface INotificatinParams {
    category?: string;
    businessId: string;
}

export type INotificationClinet = ReturnType<typeof getNotificationClinet>;

export const getNotificationClinet = () => {
    return {
        ...createLoadCleint<INotificatinParams, any>({ url: accountsUrl }),
    };
};
