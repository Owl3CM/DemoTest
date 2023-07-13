import { IQuery } from "../queries";

export interface IPostQuery extends IQuery {
  postId: string;
  query?: string;
}
export interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

export interface IPostResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}
