import { useNavigate, useParams } from "react-router-dom";
const hasValue = (value: any) => value !== null && value !== undefined && value !== "";
interface IQueryBuilderProps {
    onQueryChange?: (query: any) => void;
}
export default class QueryBuilder<T = any> {
    constructor({ onQueryChange }: IQueryBuilderProps) {
        this.onQueryChange = onQueryChange ?? (() => {});
        this.pathParams = useParams();
        this.navigate = useNavigate();
        this.init();
    }

    init = () => {
        this.storageKey = `url-query-${window.location.pathname}`;
        const search = window.location.search ?? sessionStorage.getItem(this.storageKey);
        new URLSearchParams(search).forEach((value, id) => this.set({ id, value } as any));
        this.query = this.toString();
        this.lastQuery = this.query;
        this.onQueryChange(this.getAll());
    };
    private set = (queryParma: IQueryParam<keyof T>) => {
        if (hasValue(queryParma.value))
            Object.assign(this.queryParams, {
                [queryParma.id]: { value: queryParma.value, title: queryParma.title || "_" },
            });
        else delete this.queryParams[queryParma.id];
    };
    get = (id: keyof T) => {
        const value = (this.queryParams[id] as any)?.value ?? this.pathParams?.[id];
        return hasValue(value) ? value : null;
    };
    toString = () => {
        let str = "";
        Object.entries(this.queryParams).forEach(([key, value]) => {
            str += `${key}=${value.value}&`;
        });
        return str;
    };
    getAll = () => {
        const obj: any = {};
        Object.entries(this.queryParams).forEach(([key, value]) => {
            obj[key] = value?.value;
        });

        if (this.pathParams) {
            Object.entries(this.pathParams).forEach(([key, value]) => {
                obj[key] = value;
            });
        }
        return obj;
    };

    setQueryParmas = (queries: IQueryParam<keyof T>[]) => {
        this.queryParams = {} as any;
        queries.forEach((query) => this.set(query));
        this._paramsChanged();
    };

    updateQueryParams = (queryParma: IQueryParam<keyof T> | IQueryParam<keyof T>[]) => {
        if (Array.isArray(queryParma)) queryParma.forEach((query) => this.set(query));
        else this.set(queryParma);
        this._paramsChanged();
    };
    onQueryChange: (queryParams: any) => void;

    private _paramsChanged = () => {
        if (!this._isQueryChanged()) return;
        sessionStorage.setItem(this.storageKey, this.query);
        this.onQueryChange(this.getAll());
        if (!this.navigate) throw new Error("useNavigate is not set");
        this.navigate(`?${this.query}`);
    };

    private _isQueryChanged = () => {
        console.log({ query: this.query, lastQuery: this.lastQuery });
        this.query = this.toString();
        const changed = this.query !== this.lastQuery;
        this.lastQuery = this.query;
        return changed;
    };
    private lastQuery = "";

    navigate: any;
    pathParams: any;
    queryParams = {} as T;
    storageKey: string;
    query = "";
}
export type IQueryBuilder<T = any> = QueryBuilder<T>;
export interface IQueryParam<K> {
    id: K;
    value: any;
    title?: string;
}
