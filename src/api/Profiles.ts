import instance from './api';

export const ProfilesApi = {
    findProfile(id: string) {
        return instance.get(`/profile/${id}`).then(data => data);
    }
}