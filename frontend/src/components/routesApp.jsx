import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router';

import NotFound from './pages/NotFound';
import Login from './pages/login/login';
import ChatHome from './pages/chatHome/chatHome';
import SignupForm from './pages/signup/signupForm';

import NavBar from './nav';

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
    </BrowserRouter>
  );
};

export default RoutesApp;
