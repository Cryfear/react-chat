import instance from "./api";

export const AuthApi = {
  isLoginNow(values : {email: string, authToken: string}) {
    return instance
      .post(
        `/login/me`,
        { email: values.email },
        {
          headers: {
            "auth-token": values.authToken,
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
