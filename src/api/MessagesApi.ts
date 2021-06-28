import instance from "./api";

export const MessagesApi = {
  getLastDialogMessage(id: string) {
    return instance
      .post(`/messages/last`, { id })
      .then((data) => data)
      .catch((err) => err);
  },
};

