import instance from "./api";

export const UsersApi = {
  create(values: { email: string; name: string; password: string }) {
    return instance
      .post("/users/create", values)
      .then((data) => data)
      .catch((err) => err);
  },
  getUsers(values: { page: number }) {
    return instance
      .get(`/getUsers/${values.page}`)
      .then((data) => data)
      .catch((err) => err);
  },
  getUsersByName(values: { page: number; searchText: string }) {
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
  changeUserName(values: { newNickName: string; authToken: string; email: string }) {
    return instance
      .post(`/users/changeName`, values, {
        headers: {
          "auth-token": values.authToken,
        },
      })
      .then((data) => data.data)
      .catch((err) => err);
  },
  changeUserPassword(values: {
    newPassword: string;
    authToken: string;
    email: string;
    oldPassword: string;
  }) {
    return instance
      .post(`/users/changeUserPassword`, values, {
        headers: {
          "auth-token": values.authToken,
        },
      })
      .then((data) => data.data)
      .catch((err) => err);
  },
  changeUserPhoto(formData: any) {
    return instance
      .post("http://localhost:8888/users/uploadAvatar", formData, {
        headers: {
          email: sessionStorage["email"],
          "auth-token": sessionStorage["auth-token"],
        },
      })
      .then(data => data.data)
      .catch((err) => console.log(err));
  },
};
