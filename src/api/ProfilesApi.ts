import instance from './api';

export const ProfilesApi = {
    findProfile(id: string) {
        return instance.get(`/profile/${id}`).then(data => data);
    },
    createPost(values: {id: string, content: string, date: Date, likes: {count: number, likedUsers: []}, creater: string}) {
        return instance.post('/profile/createPost', values).then(data => data)
    },
    findPosts(id: any) {
        return instance.get('/profile/posts/'+ id);
    }
}