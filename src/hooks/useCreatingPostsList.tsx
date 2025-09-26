import React from "react";
import { Post } from "../components/Home/UserPage/Posts/Post/Post";

export const useCreatingPostsList = (posts: any) => {
    const Posts = posts.data;
    console.log(Posts)
    return Posts && Posts.length > 0 ? (
        Posts.map((post: any) => {
            return <Post
                content={post.content}
                date={post.date}
                likes={post.likes}
                id={post._id} 
                comments={post.comments}
                owner={post.owner}
                creater={post.creater}
                key={post._id}
            />;
        })
    ) : (
        <div />
    );
};
