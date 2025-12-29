import { AxiosResponse } from "axios";
import instance from "./api";
import { GetMyDialogsResponse } from "@/types/Home.types";

export const DialogsApi = {
  getMyDialogs(values: { id: string; page: number }): Promise<AxiosResponse<GetMyDialogsResponse>> {
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
  create(values: { id_1: string; id_2: string }) {
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
  find(values: { id_1: string; id_2: string }) {
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
