import { Routes, Route } from 'react-router';

import NotFound from '../pages/NotFound';
import Login from '../pages/login/login';
import ChatHome from '../pages/chatHome/chatHome';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<ChatHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
