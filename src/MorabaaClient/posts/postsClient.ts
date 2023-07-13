import { createLoadCleint } from "../createClient";
import { IPost, IPostQuery } from "./types";

const postUrl = "https://dummyjson.com/posts";

export type IPostsClient = ReturnType<typeof getPostsClient>;

export type ItemsCountResponse = number;

const getPostsClient = () => {
  return {
    // for adding these functions [load, loadMore, reload]
    ...createLoadCleint<IPostQuery, IPost[]>({ url: postUrl }),
  };
};
export default getPostsClient;
