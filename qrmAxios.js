import axios from "axios";

const qrmAxios = axios.create({
  baseURL: __DEV__
    ? "http://10.1.13.5:8000/api"
    : "https://qrmangala.azurewebsites.net/api",
  headers: {
    Authorization: `Bearer ${__DEV__}`,
  },
});

export default qrmAxios;
