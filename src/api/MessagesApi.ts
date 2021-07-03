import instance from "./api";

export const MessagesApi = {
  getLastDialogMessage(id: string) {
    return instance
      .post(`/messages/last`, { id })
      .then((data) => data)
      .catch((err) => err);
  },
  create(values: { dialogId: string; myId: string; data: string }) {
    return instance
      .post("/messages/create", { ...values })
      .then((data) => data)
      .catch((err) => err);
  },
  getDialogMessages(values: { dialogId: string; page: number }) {
    return instance
      .post("/messages/all", { ...values })
      .then((data) => data)
      .catch((err) => err);
  },
  getUnreadedMessagesCount(values: { dialogId: string; userId: string }) {
    return instance
      .post("/messages/unreaded", { ...values })
      .then((data) => data)
      .catch((err) => err);
  },
};
