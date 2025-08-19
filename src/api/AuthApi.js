import instance from "./api";

export const AuthApi = {
  isLoginNow(values) {
    return instance
      .post(
        `/login/me`,
        { email: values.email },
        {
          headers: {
            "auth-token": values.authToken,
            id: sessionStorage["id"],
          },
        }
      )
      .then((data) => data)
      .catch((err) => err);
  },
  login(values) {
    return instance
      .post("/login", {
        values,
      })
      .then((data) => {
        sessionStorage["id"] = data.data.id;
        sessionStorage["auth-token"] = data.data.token;
        sessionStorage["email"] = data.data.email;
        return data;
      });
  },
  logout() {
    return instance
      .delete("/logout", {
        headers: {
          id: sessionStorage["id"],
        },
      })
      .then(() => {
        sessionStorage["id"] = null;
        sessionStorage["auth-token"] = null;
        sessionStorage["email"] = null;

        return true;
      });
  },
};
