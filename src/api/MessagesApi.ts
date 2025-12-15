import instance from "./api";

export const MessagesApi = {
  create(values: { dialogId: string; userId?: string; myId: string; data: string }) {
    return instance
      .post(
        "/messages/create",
        { ...values },
        {
          headers: {
            id: sessionStorage["id"],
          },
        }
      )
      .then((data) => data)
      .catch((err) => err);
  },
  createAudio(formData: FormData) {
    return instance
      .post("/messages/createAudio", formData, {
        headers: {
          email: sessionStorage["email"],
          "auth-token": sessionStorage["auth-token"],
          id: sessionStorage["id"],
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => data.data);
  },
  getDialogMessages(values: { dialogId: string; myId: string; page: number }) {
    return instance
      .post(
        "/messages/all",
        { ...values },
        {
          headers: {
            id: sessionStorage["id"],
          },
        }
      )
      .then((data) => data)
      .catch((err) => err);
  },
};
