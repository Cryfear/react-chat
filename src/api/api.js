import * as axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8888",
  withCredentials: true,
});

const DialogsApi = {
  getDialog() {
    return instance.get('/dialogs/5eddc4ef4b67d023085a45df')
      .then((response) => {
        console.log(response)
      })
      .catch(err => console.log(err))
  },
}

export default DialogsApi;