import axios from 'axios';
import '../mock/mock';
import { message } from 'antd';

const api = 'http://mock';

axios.interceptors.response.use((response) => {
  const res = response.data;
  if (response.status === 200 && res.code !== 0) {
    message.error(res.msg);
  } else {
    return response;
  }
});

export default function ajax(url = '', data = {}, type = 'GET') {
  if (type === 'GET') {
    let dataStr = '';
    Object.keys(data).forEach((key) => {
      dataStr += key + '=' + data[key] + '&';
    });
    if (dataStr) {
      dataStr = '?' + dataStr.substring(0, dataStr.length - 1);
    }
    return axios.get(api + url + dataStr);
  } else {
    return axios.post(api + url, data);
  }
}
