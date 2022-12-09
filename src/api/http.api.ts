import axios from "axios";
import { API_URL } from "./constant";

const headers = {
  "X-Auth-Token": "0c7100d23de447f9be17b2ec5d06c289",
  // 'Accept-Encoding': ''
}

export default class Http {
  static get(receiptUrl: string) {
    return axios
      .get(`${API_URL}${receiptUrl}`, {
        headers: headers
      })
      .catch((error) => console.log(error));
  }
}
