import instance from "./api";

export const DialogsApi = {
  getMyDialogs(id: any, page: number) {
    return instance
      .post(`/dialogs/my/${id}`, { page })
      .then((data) => data)
      .catch((err) => err);
  },
  create(id_1: string, id_2: string) {
    return instance
      .post(`/dialogs/create`, { id_1, id_2 })
      .then((data) => data)
      .catch((err) => err);
  },
  find(id1: string, id2: string) {
    return instance
      .get(`/dialogs/${id1}&${id2}`)
      .then((data) => data)
      .catch((err) => err);
  },
};
