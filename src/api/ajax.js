import axios from "axios";
import "../mock/mock";

const api = "http://localhost:3000";

export default function ajax(url = "", data = {}, type = "GET") {
  if (type === "GET") {
    let dataStr = "";
    Object.keys(data).forEach((key) => {
      dataStr += key + "=" + data[key] + "&";
    });
    if (dataStr) {
      dataStr = dataStr.substring(0, dataStr.length - 1);
    }
    return axios.get(api + url + "?" + dataStr);
  } else {
    return axios.post(api + url, data);
  }
}
