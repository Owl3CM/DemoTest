import { Api, MorabaaClientOptions } from "./MorabaaClient";
import { generateQuery } from "./Utils";
import ClientStorage from "./ClientStorage";
import { IQuery } from "./queries";

export const createLoadCleint = <T = IQuery, Response = any[]>({ url }) => {
  let offset = 0;
  let query = "";
  const createdClient = {
    load: async (params?: T, clearCash?: boolean) => {
      offset = 0;
      return new Promise<Response>(async (resolve, reject) => {
        try {
          query = generateQuery({
            url,
            params: { limit: MorabaaClientOptions.limit, ...params },
          });
          const _url = query + `&offset=${offset}`;
          let stored = clearCash ? null : ClientStorage.get(query);
          if (!stored) {
            stored = await Api.get({ url: _url });
            ClientStorage.set(query, stored);
          }
          offset += stored.length;
          resolve(stored as Response);
        } catch (error) {
          reject(error);
          MorabaaClientOptions.onError(error);
        }
      });
    },
    loadMore: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          const _url = query + `&offset=${offset}`;
          const data = await Api.get({ url: _url });
          offset += data.length;
          ClientStorage.insert(query, data);
          resolve(data as Response[]);
        } catch (error) {
          MorabaaClientOptions.onError(error);
          reject(error);
        }
      });
    },
    reload: async (params?: T) => createdClient.load(params, true),
  };
  return createdClient;
};

interface IError extends Error {
  retry: () => Promise<any>;
}

interface IGet {
  url: string;
  clearCash?: boolean;
  params?: IQuery;
}

export const createCashedGetFunction = <Response = any>({
  url,
  params,
  clearCash,
}: IGet) => {
  return new Promise<Response>(async (resolve, reject) => {
    const retry = () => createCashedGetFunction({ url, params });
    try {
      const query = generateQuery({ url, params });
      let stored = clearCash ? null : ClientStorage.get(query);
      if (!stored) {
        stored = await Api.get({ url: query });
        ClientStorage.set(query, stored);
      }
      resolve(stored);
    } catch (error) {
      error.retry = retry;
      reject(error as IError);
      console.error(url, "error");
    }
  });
};

interface IPost {
  url: string;
  body: any;
  params?: IQuery;
  clearCash?: boolean;
}

export const createPostFunction = <Response = any>({
  url,
  params,
  clearCash,
  body,
}: IPost) => {
  return new Promise<Response>(async (resolve, reject) => {
    const retry = () => createCashedGetFunction({ url, clearCash });
    try {
      const query = generateQuery({ url, params });
      const res = await Api.post({ url: query, body });
      resolve(res);
    } catch (error) {
      error.retry = retry;
      reject(error as IError);
    }
  });
};

export const createUpdateFunction = <Response = any>({
  url,
  params,
  clearCash,
  body,
}: IPost) => {
  return new Promise<Response>(async (resolve, reject) => {
    const retry = () => createCashedGetFunction({ url, clearCash });
    try {
      const query = generateQuery({ url, params });
      const res = await Api.patch({ url: query, body });
      resolve(res);
    } catch (error) {
      error.retry = retry;
      reject(error as IError);
    }
  });
};
export const createDeleteFunction = <Response = any>({
  url,
  params,
  clearCash,
}: IGet) => {
  return new Promise<Response>(async (resolve, reject) => {
    const retry = () => createCashedGetFunction({ url, clearCash });
    try {
      const query = generateQuery({ url, params });
      const res = await Api.delete({ url: query });
      resolve(res);
    } catch (error) {
      error.retry = retry;
      reject(error as IError);
    }
  });
};

export type IClentCreate = ReturnType<typeof createLoadCleint>;

// reload: async (params: IAccountsQuery) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             query = generateQuery({ url, params: { limit: MorabaaClientOptions.limit, ...params } });
//             const url = query + `&offset=${offset}`;
//             const data = await Api.get({ url });
//             offset += data.length;
//             ClientStorage.set(query, data);
//             resolve(data);
//         } catch (error) {
//             MorabaaClientOptions.onError(error);
//             reject(error);
//         }
//     });
// },
