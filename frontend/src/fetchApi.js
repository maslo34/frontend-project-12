// обертка над аксиос axios instanse
import axios from "axios";



export default () => {
    const token = JSON.parse(window.localStorage.getItem('auth')).token;
    return axios.create({
    baseURL: '/api/v1/channels',
    headers: {
        Authorization: `Bearer ${token}`,
      },
  })};