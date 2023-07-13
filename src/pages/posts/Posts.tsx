import React, { useEffect } from "react";
import PostsService from "./PostsService";
import { MorabaaClient } from "@/MorabaaClient";
import Button from "@/components/Button";
import {
  Grid,
  PagenatedContainer,
  ReactStateBuilder,
  ServiceStateBuilder,
} from "morabaa-services";
import Post from "./components/Post";

type Props = {};

const load = async () => {
  const posts = await MorabaaClient.Posts.load();
  console.log(posts);
};
const reload = async () => {
  const posts = await MorabaaClient.Posts.reload();
  console.log("RELOAD");
  console.log(posts);
};

const Posts = () => {
  const service = React.useMemo(() => new PostsService(), []);

  console.log(service.data);

  return (
    <div>
      <h2>Posts</h2>

      <PagenatedContainer service={service}>
        <ReactStateBuilder
          //
          stateName="posts"
          Component={() =>
            service.posts.map((post) => <Post key={post.id} post={post} />)
          }
          service={service}
        />
        <ServiceStateBuilder service={service} />
      </PagenatedContainer>
      <Grid service={service} itemBuilder={Post} />

      <Grid service={service} itemBuilder={Post} />
      <Button label="Fetch Posts" onClick={load} />
      {/* <Button label="Posts" onClick={async () => await service.loadPosts()} /> */}
      <Button label="Reload" onClick={reload} />
    </div>
  );
};
export default Posts;
