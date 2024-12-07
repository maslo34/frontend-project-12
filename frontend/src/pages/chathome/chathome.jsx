import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const ChatHome = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    const authorizationTokenLocalStorage = window.localStorage.getItem('auth');
    if (!authorizationTokenLocalStorage) {
      navigate('/login')
    }
  }, [navigate])
  return <h1>Home</h1>;
};

export default ChatHome;
