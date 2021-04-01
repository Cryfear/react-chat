import instance from "./api";

export const UsersApi = {
  create(values: { email: string, name: string, password: string }) {
    return instance.post("/users/create", values).then(data => data).catch(err => err);
  }
};