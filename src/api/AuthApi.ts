import instance from "./api";

export const AuthApi = {
  isLoginNow(email: string, authToken: string) {
    return instance
      .post(
        `/login/me`,
        { email },
        {
          headers: {
            "auth-token": authToken,
          },
        }
      )
      .then((data) => data);
  },
  login(values: { email: string; password: string }) {
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
};
