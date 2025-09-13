import { createEffect, createStore } from "effector";
import { ProfilesApi } from "../../../api/Profiles";

export const findProfileFx = createEffect(async (userId: string) => {
    return await ProfilesApi.findProfile(userId);
});

export const $UserPageStore = createStore(<any>{
    profileId: null,
    userId: null,
    posts: [],
    bio: '',
    friends: []
}).on(findProfileFx.doneData, (state, data) => {
    console.log(state);
    return {
        ...state,
        profileId: data.data._id,
        posts: data.data.posts,
        bio: data.data.bio,
        friends: data.data.friends,
        userId: data.data.owner
    }
})