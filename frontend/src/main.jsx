import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';

import RoutesApp from './components/routesApp.jsx';
import store from './slices/index.js';

import './index.css';

import './init.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <RoutesApp />
    </Provider>
  </StrictMode>
);
