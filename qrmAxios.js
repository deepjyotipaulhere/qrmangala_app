import axios from "axios";

const qrmAxios=axios.create({
    baseURL: 'https://qrmangala.azurewebsites.net/api',
    headers:{
        Authorization: `Bearer ${}`
    }
})