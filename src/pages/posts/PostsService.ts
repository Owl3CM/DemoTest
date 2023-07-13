import { MorabaaClient } from "../../MorabaaClient";
import ClientService from "../../MorabaaClient/ClientService";
import { IPost } from "../../MorabaaClient/posts";

// export type IService = ItemsIPostsService

export default class IPostService extends ClientService<any, any> {
  constructor() {
    super({
      client: MorabaaClient.Posts,
      onResponse: async (data: any, service: IPostService, clear: boolean) => {
        service.setPosts((prev: any[]) => (clear ? data : [...prev, ...data]));
      },
    });
    // this.load();
  }

  loadPosts = async (clear?: boolean) => {
    const posts = await MorabaaClient.Posts.load();
    this.setPosts(posts);
    console.log(posts);
  };

  posts: IPost[] = [];
  setPosts = (prev: any | ((prev: any) => any)) => {
    if (typeof prev === "function") prev = prev(this.data);
    this.data = prev;
  };

  // onItemsChanged = (newItems: any) => {
  //     console.log({ test: newItems }, "from change");
  // };

  // items: any = [];
  // setItems = (prev: any | ((prev: any) => any)) => {
  //     if (typeof prev === "function") prev = prev(this.data);
  //     this.data = prev;
  // };
}
