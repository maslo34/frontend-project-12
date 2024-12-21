// обертка над аксиос axios instanse
import axios from 'axios';

export default (path) => {
  const token = JSON.parse(window.localStorage.getItem('auth')).token;
  return axios.create({
    baseURL: `/api/v1/${path}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const registrateFetch = async (navigate, path, body, dispath, err) => {
  try {
    const request = await axios.post(`/api/v1/${path}`, body);
    window.localStorage.setItem('auth', JSON.stringify(request.data));
    navigate('/');
    dispath(request.data)
  } catch (e) {
    console.log(e);
    err(e.message)
  }
};
