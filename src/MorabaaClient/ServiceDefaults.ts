import { IClientService } from "./ClientService";

// export const getClientParams = (service: IClientService) => {
//     const params: any = {};
//     Object.keys(service.queryParams).forEach((key) => {
//         const param = service.queryParams[key];
//         if (param.value) params[param.id] = param.value;
//     });
//     return params;
// };

export const defaultLoad = (service: IClientService) => async () => {
    service.canFetch = false;
    service.state = "loading";
    service.setState("loading");
    try {
        service.beforeLoad?.(service, false);
        const data = await service.client.load(service.queryParams ?? {});
        service.afterLoad(data, service);
    } catch (error) {
        service.onError(error, service);
    }
};

export const defaultReload = (service: IClientService) => async () => {
    service.canFetch = false;
    service.setState("reloading");
    try {
        service.beforeReload?.(service, true);
        const data = await service.client.reload(service.queryParams ?? {});
        service.afterReload(data, service);
    } catch (error) {
        service.onError(error, service);
    }
};

export const defaultLoadMore = (service: IClientService) => async () => {
    service.canFetch = false;
    service.setState("loadingMore");
    try {
        service.beforeLoadMore?.(service);
        const data = await service.client.loadMore(service.queryParams ?? {});
        service.afterLoadMore(data, service);
    } catch (error) {
        service.onError(error, service);
    }
};

export const defaultOnResponse = (service: IClientService) => async (data: any, service: IClientService, clear?: boolean) => {
    service.setData((prev: any[]) => (clear ? data : [...prev, ...data]));
    setTimeout(() => {
        service.canFetch = !!(service.limit && data.length >= service.limit);
    }, 100);
    service.setState(Object.keys(service.data).length > 0 || data.length > 0 ? "idle" : "noContent");
};

export const defaultOnError = (service: IClientService) => (error: any, service: IClientService) => {
    console.log(error);
    if (error.stack) error = { message: error.message, stack: error.stack };
    service.setState({ state: "error", props: { error, service } });
};

// export const defaultAfterLoad = async (data: any, service: IClientService) => {
//     defaultOnResponse(data, service, true);
// };

// export const defaultAfterLoadMore = async (data: any, service: IClientService) => {
//     defaultOnResponse(data, service, false);
// };
