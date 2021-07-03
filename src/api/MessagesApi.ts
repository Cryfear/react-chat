import instance from "./api";

export const MessagesApi = {
  getLastDialogMessage(id: string) {
    return instance
      .post(`/messages/last`, { id })
      .then((data) => data)
      .catch((err) => err);
  },
  create(dialogId: string, myId: string, data: string) {
    return instance
      .post("/messages/create", { dialogId, myId, data })
      .then((data) => data)
      .catch((err) => err);
  },
  getDialogMessages({dialogId, page}: any) {
    return instance
      .post("/messages/all", { dialogId, page })
      .then((data) => data)
      .catch((err) => err);
  },
};
