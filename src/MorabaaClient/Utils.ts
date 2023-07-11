import { ClientRoots } from "./ApiService";

interface IQueryParams {
    [key: string]: {
        value: string | number | boolean;
        type: "string" | "number" | "boolean";
    };
}

export interface IQuery {
    params?: IQueryParams;
    limit?: number;
    offset?: number;
    sort?: string;
    order?: "asc" | "desc";
}

interface Props {
    // root: string;
    // endpoint: string;
    url: string;
    params?: any;
    limit?: number;
    offset?: number;
}
export const generateQuery = ({ url, params }: Props) => {
    if (!params) return url;
    let query = `${url}?`;
    new URLSearchParams(params).forEach((value, key) => {
        if (key !== "clearCash") query += `${key}=${value}&`;
    });
    return query;
};

export const hasValue = (value: any) => {
    return value !== null && value !== undefined && value !== "";
};
