import { IQuery } from "../queries";

export interface IItemsQuery extends IQuery {
    businessId: string;
    query?: string;
}
export interface IPostQuery extends IQuery {
    postId: string;
    query?: string;
}

export interface IItem {
    id: number;
    name: string;
    code: string;
    barcode?: string;
    unit: string;
    unitId: number;
}

export interface IItemsResponse {
    id: number;
    name: string;
    code: string;
    barcode: string;
    unit: string;
    unitId: number;
}

export interface IPost {
    id: number
    title: string
    body: string
    userId: number
    tags: string[]
    reactions: number
  }
  