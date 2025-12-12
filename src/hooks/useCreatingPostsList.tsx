import { Post } from "@components/UserPage/Posts/Post/Post";

export type IPost = {
    creater: {
      avatar: string,
      fullName: string
    };
    owner: string;
    date: Date;
    content: string;
    likes: {
      count: number
    };
    comments: {};
    _id?: string
};

export const useCreatingPostsList = (posts: IPost[] | null | undefined) => {
  if (!posts || posts.length === 0) {
    return <div />;
  }

  const sorted = [...posts].reverse();

  return sorted.map((post) => (
    <Post
      content={post.content}
      date={post.date}
      likes={post.likes}
      _id={post._id}
      comments={post.comments}
      owner={post.owner}
      creater={post.creater}
      key={post._id}
    />
  ));
};
