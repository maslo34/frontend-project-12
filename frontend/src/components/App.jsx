import { Routes, Route } from 'react-router';

import NotFound from '../pages/NotFound';
import Login from '../pages/Login/login';

const App = () => {
  return (
    <Routes>
      {/* <Route path='/' element={<Chat />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
