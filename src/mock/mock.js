import Mock from "mockjs";
import Cookies from "js-cookie";

const api = "http://localhost:3000";
Mock.mock(`${api}/users/login`, "post", function (options) {
  const _id = Mock.mock("@id");
  Cookies.set("userId", _id);
  return {
    code: 0,
    data: {
      username: JSON.parse(options.body).username,
      _id,
    },
  };
});
