import React from "react";

interface Props {
  post: {
    id?: number;
    title: string;
    body: string;
    userId: number;
    tags?: string[];
    reactions?: number;
  };
}

const Post = ({ post }: Props) => {
  return (
    <div>
      <h1> title: {post.title}</h1>
      <h5>userID: {post.userId}</h5>
      <p>body: {post.body}</p>
    </div>
  );
};

export default Post;
