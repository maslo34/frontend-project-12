// обертка над аксиос axios instanse
import axios from 'axios';
import i18next from './init';
import { getToken } from './utils';
import { toast } from 'react-toastify';

i18next.t('my.key');
const notify = () => toast.error(i18next.t('toastMessage.error'));

export default (path) => {
  try {
    const token = JSON.parse(window.localStorage.getItem('auth')).token;
    return axios.create({
      baseURL: `/api/v1/${path}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const fetchToken = async (navigate, path, body, dispath, err) => {
  try {
    const request = await axios.post(`/api/v1/${path}`, body);
    await window.localStorage.setItem('auth', JSON.stringify(request.data));
    await dispath(request.data);
    await navigate('/');
  } catch (e) {
    switch (e.status) {
      case 401:
        err(i18next.t('errorFetch.noValidUsername'));
        break;
      case 409:
        err(i18next.t('errorFetch.duplicate'));
        break;
      default:
        notify();
    }
  }
};

export const sendMessege = async (message, channelId, username) => {
  const newMessage = { body: message, channelId, username };
  try {
    await axios.post('/api/v1/messages', newMessage, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const fetchChanel = async (
  payload,
  query,
  id,
  handleNewActualChanel = 1
) => {
  try {
    console.log(payload, query, id);
    const request = await query(payload, id);
    handleNewActualChanel(request.data);
    console.log(request.data);
  } catch (e) {
    console.log(e);
  }
};
