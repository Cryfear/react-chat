import instance from "./api";

export const UsersApi = {
  create(values: { email: string; name: string; password: string; }) {
    return instance
      .post("/users/create", values)
      .then((data) => data)
      .catch((err) => err);
  },
  getUsers(values: { page: number }) {
    return instance
      .get(`/getUsers/${values.page}`, {
        headers: {
          id: sessionStorage["id"],
        },
      })
      .then((data) => data)
      .catch((err) => err);
  },
  getUsersByName(values: { page: number, searchText: string }) {
    return instance
      .get(`/getUsersByName/${values.page}/${values.searchText}`, {
        headers: {
          id: sessionStorage["id"],
        },
      })
      .then((data) => data)
      .catch((err) => err);
  },
  findUser(id: string) {
    if (id && id !== 'null') {
      return instance
        .get(`/users/${id}`, {
          headers: {
            id: sessionStorage["id"],
          },
        })
        .then((data) => data)
        .catch((err) => err);
    }

  },
  changeUserName(values: { authToken: string, newNickName: string, email: string }) {
    return instance
      .post(`/users/changeName`, values, {
        headers: {
          "auth-token": values.authToken,
          "id": sessionStorage['id']
        },
      })
      .then((data) => data.data)
      .catch((err) => err);
  },
  changeUserPassword(values: { authToken: string, newPassword: string, oldPassword: string, email: string }) {
    return instance
      .post(`/users/changeUserPassword`, values, {
        headers: {
          "auth-token": values.authToken,
          "id": sessionStorage['id']
        },
      })
      .then((data) => data.data)
      .catch((err) => err);
  },
  changeUserPhoto(formData: FormData) {
    return instance
      .post("http://localhost:8888/users/uploadAvatar", formData, {
        headers: {
          'email': sessionStorage["email"],
          "auth-token": sessionStorage["auth-token"],
          "id": sessionStorage['id'],
          "Content-Type": "multipart/form-data",
        },
      })
      .then(data => data.data)
      .catch((err) => console.log(err));
  },
};
