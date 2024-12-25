import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';

import NotFound from './components/pages/NotFound';
import Login from './components/pages/login/login';
import ChatHome from './components/pages/chatHome/chatHome';
import SignupForm from './components/pages/signup/signupForm';

import NavBar from './components/nav';

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<ChatHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default RoutesApp;
