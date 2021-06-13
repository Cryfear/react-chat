import instance from "./api";

export const DialogsApi = {
  getMyDialogs(id: string, page: any) {
    return instance.get(`/dialogs/my/${id}`, page).then(data => data).catch(err => err);
  }
};