import { ClientServiceConstructor, ICleintQueryParams } from "./Types";
import { ServiceState } from "@/assets/stateKit";
import { defaultLoad, defaultLoadMore, defaultOnError, defaultOnResponse, defaultReload } from "./ServiceDefaults";
import { State as IState, StateBuilder } from "morabaa-services";

export type IClientService = ClientService<IClientService, any, ServiceState>;

export default class ClientService<Service, QueryParams = Object, State = IState> extends StateBuilder<State> {
    constructor({
        client,
        onError,
        onResponse,
        afterLoad,
        afterReload,
        afterLoadMore,
        beforeLoad,
        beforeReload = beforeLoad,
        beforeLoadMore,
    }: ClientServiceConstructor<Service, QueryParams>) {
        super();
        Object.assign(this, {
            client,
            onResponse: onResponse ?? defaultOnResponse(this as IClientService),
            onError: onError ?? defaultOnError(this as IClientService),
            load: defaultLoad(this as IClientService),
            reload: defaultReload(this as IClientService),
            loadMore: defaultLoadMore(this as IClientService),
            afterLoad,
            afterReload,
            afterLoadMore,
            beforeLoad,
            beforeReload,
            beforeLoadMore,
        });

        if (!afterLoad)
            this.afterLoad = (data) => {
                this.onResponse(data, this as any, true);
            };
        if (!afterReload) this.afterReload = this.afterLoad;
        if (!afterLoadMore) {
            this.afterLoadMore = (data) => {
                this.onResponse(data, this as any, false);
            };
        }
    }

    queryParams: QueryParams = {} as any;
    setQueryParmas = (prev: QueryParams | ((prev: QueryParams) => QueryParams)) => {
        if (typeof prev === "function") prev = (prev as any)(this.queryParams);
        (this.queryParams as any) = prev;
        this.load();
    };
    offset = 0;
    limit = 25;
    canFetch = false;

    client: {
        load: (queryParams?: QueryParams) => Promise<any> | any;
        reload: (queryParams?: QueryParams) => Promise<any> | any;
        loadMore?: (queryParams?: QueryParams) => Promise<any> | any;
    };

    data: any = [];
    setData = (prev: any | ((prev: any) => any)) => {
        if (typeof prev === "function") prev = prev(this.data);
        this.data = prev;
    };

    load = async () => Promise<any>;
    reload = async () => Promise<any>;
    loadMore: () => Promise<any>;

    interceptor?: ((service: Service) => void) | undefined;
    onError?: (error: any, service: Service) => void;
    onResponse?: (response: any, service: Service, clear: boolean) => any;

    afterLoad: (data: any, service: Service) => void;
    afterReload: (data: any, service: Service) => void;
    afterLoadMore: (data: any, service: Service) => void;

    beforeLoad: (service: Service, clearCash: boolean) => void;
    beforeReload: (service: Service, clearCash: boolean) => void;
    beforeLoadMore: (service: Service) => void;
}
