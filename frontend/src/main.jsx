import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import RoutesApp from './routesApp.jsx';
import store from './slices/index.js';

import './index.css';

import App from './init.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App>
        <RoutesApp />
      </App>
    </Provider>
  </StrictMode>,
);
