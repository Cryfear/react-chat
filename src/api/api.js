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
        return response;
      })
      .catch(err => console.log(err));
  },
  createDialog(id_1, id_2) {
    return instance
      .post("/dialogs/create", {
        id_1: id_1,
        id_2: id_2,
      })
      .then(data => {
        console.log(data);
        return data;
      });
  },
};

export const MessagesApi = {
  async getDialogMessages(id1, id2) {
    return instance
      .post(`/messages/all`, {
        id1,
        id2,
      })
      .then(data => {
        return data;
      });
  },
  async createMessage(id1, id2, text) {
    return instance
      .post("/messages/create", {
        id1,
        id2,
        data: text,
      })
      .then(data => {
        return data;
      });
  },
};

export const UsersApi = {
  async getUsers(page) {
    return instance.get(`/getUsers/${page}`).then(data => {
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
    return instance.get(`/users/${id}`).then(data => {
      return data;
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
