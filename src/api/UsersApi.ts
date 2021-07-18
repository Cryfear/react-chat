import instance from "./api";

export const UsersApi = {
  create(values: { email: string; name: string; password: string }) {
    return instance
      .post("/users/create", values)
      .then((data) => data)
      .catch((err) => err);
  },
  getUsers(page: number ) {
    return instance
      .get(`/getUsers/${page}`)
      .then((data) => data)
      .catch((err) => err);
  },
  getUsersByName(values: {page: number, searchText: string}) {
    return instance
      .get(`/getUsersByName/${values.page}/${values.searchText}`)
      .then((data) => data)
      .catch((err) => err);
  },
  findUser(id: string) {
    return instance
      .get(`/users/${id}`)
      .then((data) => data)
      .catch((err) => err);
  },
};
