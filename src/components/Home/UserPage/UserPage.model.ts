import { createEffect, createStore, sample } from "effector";
import { ProfilesApi } from "../../../api/ProfilesApi";

export const findPostsFx = createEffect(async (id: string): Promise<any> => {
    const postss = await ProfilesApi.findPosts(id);
    console.log(postss);
    return postss.data;
})

export const $posts = createStore([]);

sample({
    clock: findPostsFx.doneData,
    target: $posts
})

export const findProfileFx = createEffect(async (userId: string) => {
    return await ProfilesApi.findProfile(userId);
});

export const $UserPageStore = createStore(<any>{
    profileId: null,
    userId: null,
    bio: '',
    friends: []
}).on(findProfileFx.doneData, (state, data) => {
    return {
        ...state,
        profileId: data.data._id,
        posts: data.data.posts,
        bio: data.data.bio,
        friends: data.data.friends,
        userId: data.data.owner
    }
})