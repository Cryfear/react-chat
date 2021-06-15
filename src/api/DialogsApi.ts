import instance from "./api";

export const DialogsApi = {
  getMyDialogs(id: any) {
    return instance
      .get(`/dialogs/my/${id}`)
      .then((data) => data)
      .catch((err) => err);
  },
  create(id_1: string, id_2: string) {
    return instance
      .post(`/dialogs/create`, { id_1, id_2 })
      .then((data) => data)
      .catch((err) => err);
  },
};
