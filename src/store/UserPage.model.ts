import { createEffect, createStore, sample } from "effector";
import { ProfilesApi } from "@api/ProfilesApi";
import { IPost } from "@hooks/useCreatingPostsList";

export const findPostsFx = createEffect(async (id: string): Promise<IPost[]> => {
  const response = await ProfilesApi.findPosts(id);
  return response.data; // предполагая что API возвращает { data: IPost[] }
});

interface CreatePostParams {
  id: string;
  content: string;
  creater: string;
}

export const createPostFx = createEffect(async ({ id, content, creater }: CreatePostParams): Promise<void> => {
  if (content.length < 1) return;

  try {
    await ProfilesApi.createPost({ id, content, date: new Date(), creater });
    findPostsFx(id);
  } catch {
    console.log("post not created");
  }
});

export const $posts = createStore<IPost[]>([]);;

sample({
  clock: findPostsFx.doneData,
  target: $posts,
});

export const findProfileFx = createEffect(async (userId: string) => {
  return await ProfilesApi.findProfile(userId);
});

interface userPageStoreTypes {
  user: {
    fullName: string;
    _id: string;
    avatar: string;
  } | null;
  bio: string;
  friends: any[];
  profileId: string | null;
}

export const $UserPageStore = createStore({
  profileId: null,
  user: null,
  bio: "",
  friends: [],
} as userPageStoreTypes).on(findProfileFx.doneData, (state, data) => {
  if(!data) return state;
  return {
    ...state,
    profileId: data.data._id,
    posts: data.data.posts,
    bio: data.data.bio,
    friends: data.data.friends,
    user: data.data.owner,
  };
});
