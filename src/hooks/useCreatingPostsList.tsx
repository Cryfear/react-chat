import React from "react";
import { Post } from "../components/Home/UserPage/Post/Post";

export const useCreatingPostsList = (posts: any) => {
    console.log(posts);
    return posts && posts.length > 0 ? (
        posts.map((post: any) => {
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
