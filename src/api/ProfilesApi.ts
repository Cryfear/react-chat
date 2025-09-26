import instance from './api';

export const ProfilesApi = {
    findProfile(id: string | null | undefined) {
        if (id) return instance.get(`/profile/${id}`);
    },
    createPost(values: { id: string | null | undefined, content: string, date: Date, creater: string }) {
        if(values.id)  return instance.post('/profile/createPost', values)
    },
    findPosts(id: string) {
        return instance.get('/profile/posts/' + id);
    }
}