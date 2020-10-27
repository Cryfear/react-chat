import instance from "./api";

export default {
  getDialog(id: string, id2: string) {
    return instance
      .get(`/dialogs/${id}&${id2}`)
      .then((response) => response)
      .catch((err) => console.log(err));
  },
  createDialog(id_1: string, id_2: string) {
    return instance
      .post("/dialogs/create", {
        id_1: id_1,
        id_2: id_2,
      })
      .then((data) => {
        return data;
      });
  },
  getMyDialogs(id: string) {
    return instance
      .get(`/dialogs/my/${id}`)
      .then((response) => response)
      .catch((err) => console.log(err));
  },
};
