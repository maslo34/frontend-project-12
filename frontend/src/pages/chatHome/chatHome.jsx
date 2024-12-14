import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { addChanel } from '../../slices/chanelSlice';
import { addMessage } from '../../slices/messageSlice';
import ChanelList from '../../components/chanelList';
import Chat from '../../components/chat/chat';

import './chatHome.css'

const ChatHome = () => {
  const navigate = useNavigate();
  // проверять в сторе auth наличие токена, если нет диспатчить из локал сторедж

  useEffect(() => {
    const authorizationTokenLocalStorage = window.localStorage.getItem('auth');
    if (!authorizationTokenLocalStorage) {
      navigate('/login');
    }
  }, [navigate]);
  
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    // вынесте общую логику axios запроса в функцию, дергать из utils
    const fetchCanel = async () => {
      const request = await axios.get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(request.data)
      dispatch(addChanel(request.data));
    };
    const fetchMessage = async () => {
      const request = await axios.get('/api/v1/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(addMessage(request.data));
    };
    fetchCanel();
    fetchMessage();
  }, [dispatch, token]);

  const [activeChenel, setActiveChenel] = useState('1')

  const handleActiveChenel = (id) => {
    setActiveChenel(id)
  }

  return (
    <div className='conteiner'>
      <h1>Home</h1>
      <ChanelList hendleClick={handleActiveChenel}/>
      <Chat activeChenel={activeChenel} />
    </div>
  );
};

export default ChatHome;
