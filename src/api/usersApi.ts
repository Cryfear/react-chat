import instance, { ValuesTypes } from "./api";

export default {
  getUsers(page: number) {
    return instance.get(`/getUsers/${page}`).then((data) => {
      return data;
    });
  },

  isLoginNow(email: string) {
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
      .then((data) => {
        return data;
      });
  },

  getUser(id: string) {
    return instance.get(`/users/${id}`).then((data) => {
      return data;
    });
  },

  loginUser(values: ValuesTypes) {
    return instance
      .post("/login", {
        values,
      })
      .then((data) => {
        console.log(data);
        sessionStorage["auth-token"] = data.data.token;
        sessionStorage["userEmail"] = data.data.email;
        return data;
      });
  },

  logoutUser() {
    return instance.delete("/logout").then((data) => {
      console.log("Вы вышли из аккаунта.");
      console.log(data);
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("userEmail");
    });
  },

  createUser(email: string, fullName: string, password: string) {
    return instance
      .post("/users/create", {
        email: email,
        fullName: fullName,
        password: password,
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },
};
