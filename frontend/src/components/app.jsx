import { Routes, Route, Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authUserSlice';

import NotFound from '../pages/NotFound';
import Login from '../pages/login/login';
import ChatHome from '../pages/chatHome/chatHome';
import SignupForm from '../pages/signup/signupForm';

import { Container, Button } from 'react-bootstrap';

 

const App = () => {
  const authorizationTokenLocalStorage = JSON.parse(
    window.localStorage.getItem('auth')
  );
  const navigate = useNavigate();
  const dispath = useDispatch()
  const logOut = () => {
    window.localStorage.removeItem('auth');
    dispath(setCredentials({token: '', username: ''}))
    navigate('login')
  } 
  return (
    <>
      <nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
        <Container >
          <Link className='navbar-brand' to='/'>Hexlet Chat</Link>
          {authorizationTokenLocalStorage? <Button onClick={logOut} variant='primary'>Выйти</Button>: <></>}
        </Container>
      </nav>
      <Routes>
        <Route path="/" element={<ChatHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </>
  );
};

export default App;
