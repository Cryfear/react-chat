import instance from "./api";

export const DialogsApi = {
  getMyDialogs(values: { id: any; page: number }) {
    return instance
      .post(`/dialogs/my/${values.id}`, { page: values.page })
      .then((data) => data)
      .catch((err) => err);
  },
  create(values: { id_1: string; id_2: string }) {
    return instance
      .post(`/dialogs/create`, { ...values })
      .then((data) => data)
      .catch((err) => err);
  },
  find(values: { id_1: string; id_2: string }) {
    return instance
      .get(`/dialogs/${values.id_1}&${values.id_2}`)
      .then((data) => data)
      .catch((err) => err);
  },
};
