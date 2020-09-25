import axios from "axios";

const config = {
  baseURL: "http://127.0.0.1:8888",
  withCredentials: true,
};

interface ValuesTypes {
 token: string,
 email: string
}

const instance = axios.create(config);

export const DialogsApi = {
  getDialog(id: string, id2: string) {
    return instance
      .get(`/dialogs/${id}&${id2}`)
      .then(response => {
        return response;
      })
      .catch(err => console.log(err));
  },
  createDialog(id_1: string, id_2: string) {
    return instance
      .post("/dialogs/create", {
        id_1: id_1,
        id_2: id_2,
      })
      .then(data => {
        return data;
      });
  },
};

export const MessagesApi = {
  async getDialogMessages(id1: string, id2: string) {
    return instance
      .post(`/messages/all`, {
        id1,
        id2,
      })
      .then(data => {
        return data;
      });
  },
  async createMessage(id1: string, id2: string, text: string) {
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
  async getUsers(page: number) {
    return instance.get(`/getUsers/${page}`).then(data => {
      return data;
    });
  },

  async isLoginNow(email: string) {
    return instance
      .post(
        `/login/me`,
        { email },
        {
          headers: {
            "auth-token": sessionStorage["auth-token"],
          },
        }
      )
      .then(data => {
        return data;
      });
  },

  async getUser(id: string) {
    return instance.get(`/users/${id}`).then(data => {
      return data;
    });
  },

  async loginUser(values: ValuesTypes) {
    return instance
      .post("/login", {
        values,
      })
      .then(data => {
        console.log(data);
        sessionStorage["auth-token"] = data.data.token;
        sessionStorage["userEmail"] = data.data.email;
        return data;
      });
  },

  async logoutUser() {
    return instance.delete("/logout").then(data => {
      console.log("Вы вышли из аккаунта.");
      console.log(data);
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("userEmail");
    });
  },

  async createUser(email: string, fullName: string, password: string) {
    return instance
      .post("/users/create", {
        email: email,
        fullName: fullName,
        password: password,
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
