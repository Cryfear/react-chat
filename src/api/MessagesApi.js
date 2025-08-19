import instance from "./api";

export const MessagesApi = {
  getLastDialogMessage(id) {
    return instance
      .post(`/messages/last`, { id }, {
        headers: {
          id: sessionStorage["id"],
        },
      })
      .then((data) => data)
      .catch((err) => err);
  },
  create(values) {
    return instance
      .post("/messages/create", { ...values }, {
        headers: {
          id: sessionStorage["id"],
        },
      })
      .then((data) => data)
      .catch((err) => err);
  },
  getDialogMessages(values) {
    return instance
      .post("/messages/all", { ...values }, {
        headers: {
          id: sessionStorage["id"],
        },
      })
      .then((data) => data)
      .catch((err) => err);
  },
  getUnreadedMessagesCount(values) {
    return instance
      .post("/messages/unreadedCount", { ...values }, {
        headers: {
          id: sessionStorage["id"],
        },
      })
      .then((data) => data)
      .catch((err) => err);
  },
  getUnreadedMessagesWithData(values) {
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
