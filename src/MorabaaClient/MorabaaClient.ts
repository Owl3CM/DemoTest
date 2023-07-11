import { getAccountsClient } from "./accounts/Accounts";
import { getItemsClient } from "./items";
import { getNotificationClinet } from "./notification/Notification";
import ApiService, { ClientRoots } from "./ApiService";
import { getBusinessesClient } from "./businesses/BusinessesClient";
import { getHomeClient } from "./Home/HomeClient";
import { getTransaction } from "./transaction/Transaction";
import getMyAccountsClient from "./myAccounts/MyAccountsClient";
import { getRestaurantClient } from "./restaurant/Restaurant";
import { getInvoicesClient } from "./invoices/Invoices";
import getRepresentativesClient from "./Representatives/representativesClient";
import { getBondsClient } from "./bonds/getBondsClient";
import getSalesClient from "./Sale/SaleClient.ts";

const MorabaaClient = {
    Authorization: (token: string) => (MorabaaClientOptions.authToken = token),
    Accounts: getAccountsClient(),
    Items: getItemsClient(),
    Notification: getNotificationClinet(),
    Businesses: getBusinessesClient(),
    Home: getHomeClient(),
    Representatives: getRepresentativesClient(),
    Transaction: getTransaction(),
    MyAccounts: getMyAccountsClient(),
    Restaurant: getRestaurantClient(),
    Invoices: getInvoicesClient(),
    Bond: getBondsClient(),
    Sales: getSalesClient(),
    SalesPerDay: {
        load: () => {},
        reload: () => {},
    },
    Transactions: {
        load: () => {},
        reload: () => {},
    },
};

export type IMorabaaClient = typeof MorabaaClient;

interface IMorabaaClientOptions {
    onRespoinse: (res: any) => void;
    onError: (err: any) => void;
    intereceptors: {};
    useOffline: boolean;
    useCache: boolean;
    useAuth: boolean;
    useRefreshToken: boolean;
    authToken: string;
    customRoot: string;
    limit: number;
}

export const MorabaaClientOptions: IMorabaaClientOptions = {
    onRespoinse: (res) => {
        // console.log("MorabaaClientOptions.onRespoinse", res);
    },
    onError: (err) => {
        // console.log("MorabaaClientOptions.onError", err);
        throw err;
    },

    intereceptors: {
        request: {
            before: (req) => {
                // console.log("MorabaaClientOptions.intereceptors.request.before", req);
            },
            after: (req, res) => {
                // console.log("MorabaaClientOptions.intereceptors.request.after", req, res);
            },
        },
    },

    useOffline: true,
    useCache: true,
    useAuth: true,
    useRefreshToken: false,
    authToken: null,
    customRoot: null,
    limit: 25,
};

export const Api = ApiService.create({
    headers: {
        "App-Package": "com.morabaa.my",
        "Content-Type": "application/json",
        // Authorization: MorabaaClientOptions.authToken,
    },
    onError: MorabaaClientOptions.onError,
    onResponse: MorabaaClientOptions.onRespoinse,
    interceptor: async (props) => {
        if (MorabaaClientOptions.useAuth) {
            // props.headers.Authorization = MorabaaClientOptions.authToken;
        }
        if (MorabaaClientOptions.useRefreshToken) {
        }
        return props;
    },
});

export const setMorabaaClientOptions = (options: Partial<IMorabaaClientOptions> | null = null) => {
    if (options.customRoot) {
        MorabaaClientOptions.customRoot = options.customRoot;
        Object.entries(ClientRoots).forEach(([key, value]) => {
            ClientRoots[key] = `${options.customRoot}/api${ClientRoots[key].split("/api")[1]}`;
        });
    }

    console.log("setMorabaaClientOptions", options);
};

export default MorabaaClient;
