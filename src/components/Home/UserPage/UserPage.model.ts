import { createEffect, createStore, sample } from "effector";
import { ProfilesApi } from "../../../api/ProfilesApi";

export const findPostsFx = createEffect(async (id: string): Promise<any> => {
    return await ProfilesApi.findPosts(id);
})

export const createPostFx = createEffect(async ({ id, content, creater }: { id: string, content: string, creater: string }): Promise<any> => {
    if (content.length < 1) return false; // если инпут пришел пустой не отправлять запрос на сервер
    
    await ProfilesApi.createPost({ id, content, date: new Date(), creater });
    findPostsFx(id);
})

export const $posts = createStore([]);

sample({
    clock: findPostsFx.doneData,
    target: $posts
});

export const findProfileFx = createEffect(async (userId: string) => {
    return await ProfilesApi.findProfile(userId);
});

interface userPageStoreTypes {
    user: {
        fullName: string,
        _id: string,
        avatar: string
    } | null,
    bio: string,
    friends: any[],
    profileId: string | null
}

export const $UserPageStore = createStore({
    profileId: null,
    user: null,
    bio: '',
    friends: []
} as userPageStoreTypes).on(findProfileFx.doneData, (state, data: any) => {
    return {
        ...state,
        profileId: data.data._id,
        posts: data.data.posts,
        bio: data.data.bio,
        friends: data.data.friends,
        user: data.data.owner
    }
})