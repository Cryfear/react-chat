import * as axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8888",
  withCredentials: true,
});

export const DialogsApi = {
  getDialog() {
    return instance
      .get("/dialogs/5eddc4ef4b67d023085a45df")
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err));
  },
};

export const UsersApi = {
  async getUsers(page) {
    return instance.get(`/getUsers/${page}`).then(data => {
      console.log(data);
      return data;
    });
  },
  async isLoginNow(email) {
    return instance
      .post(`/login/me`, {
        email: email,
      })
      .then(data => {
        console.log(data);
        return data;
      });
  },
  async getUser(id) {
    return instance.get(`/users/:${id}`).then(data => {
      console.log(data);
    });
  },
  async loginUser(values) {
    return instance
      .post("/login", {
        values,
      })
      .then(data => {
        sessionStorage["userId"] = data.data.userId;
        sessionStorage["userEmail"] = data.data.userEmail;
        return data;
      });
  },
  async logoutUser() {
    return instance.delete("/logout").then(data => {
      console.log("Вы вышли!!");
      console.log(data);
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("userEmail");
    });
  },
  async createUser(values) {
    return instance
      .post("/users/create", {
        email: values.email,
        fullName: values.username,
        password: values.password,
        repeatPassword: values.repeatPassword,
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  },
};
