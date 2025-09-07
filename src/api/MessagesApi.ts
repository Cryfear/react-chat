import instance from "./api";

export const MessagesApi = {
  getLastDialogMessage(id: string) {
    return instance
      .post(`/messages/last`, { id }, {
        headers: {
          id: sessionStorage["id"],
        },
      })
      .then((data) => data)
      .catch((err) => err);
  },
  create(values: any) {
    console.log(values);
    return instance
      .post("/messages/create", { ...values }, {
        headers: {
          id: sessionStorage["id"],
        },
      })
      .then((data) => data)
      .catch((err) => err);
  },
  getDialogMessages(values: { dialogId: string, myId: string, page: number }) {
    return instance
      .post("/messages/all", { ...values }, {
        headers: {
          id: sessionStorage["id"],
        },
      })
      .then((data) => data)
      .catch((err) => err);
  },
  getUnreadedMessagesCount(values: {dialogId: string, userId: string}) {
    return instance
      .post("/messages/unreadedCount", { ...values }, {
        headers: {
          id: sessionStorage["id"],
        },
      })
      .then((data) => data)
      .catch((err) => err);
  },
  getUnreadedMessagesWithData(values: any) {
    console.log(values);
    return instance
      .post("/messages/unreadedWithData", { ...values }, {
        headers: {
          id: sessionStorage["id"],
        },
      })
      .then((data) => data)
      .catch((err) => err);
  },
};
