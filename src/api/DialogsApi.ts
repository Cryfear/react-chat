import instance from "./api";

export type dialogPromiseType = {
  data: {
    users: [
      _id1: string,
      _id2: string
    ],
    isTyping: boolean,
    _id: string
  }
}

type promisedialogstypes = {
  data: [{users: [string, string]}]
}

export const DialogsApi = {
  getMyDialogs(values: { id: string, page: number }): Promise<promisedialogstypes> {
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
  create(values: {}) {
    console.log(values) //dont forget do typization pls
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
  find(values: { id_1: string, id_2: string }): Promise<dialogPromiseType> {
    return instance
      .get(`/dialogs/${values.id_1}&${values.id_2}`, {
        headers: {
          id: sessionStorage["id"],
        },
      })
      .then((data) => data)
      .catch((err) => err);
  },
};
