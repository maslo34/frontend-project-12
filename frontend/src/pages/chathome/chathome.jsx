import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { addChanel } from '../../slices/chanelSlice';
import { addMessage } from '../../slices/messageSlice';
import ChanelList from '../../components/chanelList';
import MessageComponent from '../../components/messageVue';

const ChatHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    console.log('open')
    const authorizationTokenLocalStorage = window.localStorage.getItem('auth');
    if (!authorizationTokenLocalStorage) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCanel = async () => {
      const request = await axios.get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch(addChanel(request.data))
    };
    const fetchMessage = async () => {
      const request = await axios.get('/api/v1/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch(addMessage(request.data))
    };
    fetchCanel()
    fetchMessage()
  }, [dispatch, token]);

  return (
    <div>
      <h1>Home</h1>
      <ChanelList />
      <MessageComponent />
    </div>
  );
};

export default ChatHome;
