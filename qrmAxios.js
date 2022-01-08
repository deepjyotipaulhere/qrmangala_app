import axios from "axios";

const qrmAxios = axios.create({
  baseURL: "https://qrmangala.azurewebsites.net/api",
  headers: {
    Authorization: `Bearer ${__DEV__}`,
  },
});
// qrmAxios.interceptors.response.use((req)=>{
//   console.log(req);
// })
export default qrmAxios;
