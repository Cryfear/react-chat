import instance from "./api";

export default {
  getDialogMessages(id1: string, id2: string) {
    return instance
      .post(`/messages/all`, {
        id1,
        id2,
      })
      .then((data) => data);
  },
  createMessage(id1: string, id2: string, text: string) {
    return instance
      .post("/messages/create", {
        id1,
        id2,
        data: text,
      })
      .then((data) => data);
  },
  getLastMessage(id1: string, id2: string) {
    return instance
      .post(`/messages/last`, {
        id1,
        id2,
      })
      .then((data) => data);
  },
  getUnreadMessages(id1: string, id2: string) {
    return instance
      .post("/messages/unreaded", {
        id1,
        id2,
      })
      .then((data) => data);
  },
};
