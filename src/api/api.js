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
  async getUser(id) {
    instance.get(`/users/:${id}`).then(data => {
      console.log(data);
    });
  },
  async createUser(values) {
    instance
      .post("/users/create", {
        email: values.email,
        fullName: values.username,
        password: values.password,
        repeatPassword: values.repeatPassword,
      })
      .then(data => {
        console.log(values);
        console.log(data);
      });
  },
  async loginUser(values) {},
};
