import instance from "./api";

export const DialogsApi = {
  getMyDialogs(values) {
    return instance
      .post(
        `/dialogs/my/${values.id}`,
        { page: values.page },
        {
          headers: {
            id: sessionStorage["id"],
          },
        }
      )
      .then((data) => data)
      .catch((err) => err);
  },
  create(values) {
    return instance
      .post(
        `/dialogs/create`,
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
  find(values) {
    return instance
      .get(`/dialogs/${values.id_1}&${values.id_2}`, {
        headers: {
          id: sessionStorage["id"],
        },
      })
      .then((data) => data)
      .catch((err) => console.log('Создайте свою историю!'));
  },
};
