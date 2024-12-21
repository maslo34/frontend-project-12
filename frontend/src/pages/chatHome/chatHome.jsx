import { useNavigate } from 'react-router';
import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCredentials } from '../../slices/authUserSlice';
import ChanelList from '../../components/chanelList/chanelList';
import Chat from '../../components/chat/chat';
import CustomModal from '../../components/modal/modal';

import './chatHome.css';

const ChatHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // проверять в сторе auth наличие токена, если нет диспатчить из локал сторедж
  const { token } = useSelector((state) => state.auth);
  const modalIsShow = useSelector((state) => state.modal.isShow);
  useEffect(() => {
    console.log('вход')
    const authorizationTokenLocalStorage = JSON.parse(
      window.localStorage.getItem('auth')
    );
    if (!authorizationTokenLocalStorage && !token) {
      navigate('/login');
    } else if (authorizationTokenLocalStorage && !token) {
      dispatch(setCredentials(authorizationTokenLocalStorage));
    }
  }, [navigate, dispatch, token]);

  const [activeChenel, setActiveChenel] = useState('1');

  const handleActiveChenel = useCallback(
    (id) => {
      setActiveChenel(id);
    },
    [setActiveChenel]
  );

  return (
    <div className="page-chat-conteiner shadow">
      {modalIsShow ? <CustomModal optionsModal={modalIsShow} /> : <></>}
      <ChanelList
        hendleClickChanel={handleActiveChenel}
        activeChenel={activeChenel}
      />
      <Chat activeChenel={activeChenel} />
    </div>
  );
};

export default ChatHome;
