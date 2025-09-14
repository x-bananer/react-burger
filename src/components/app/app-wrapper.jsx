import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from '../../services/store.js';

import AppInitializer from './app-initializer.jsx';
import App from './app.jsx'

const AppWrapper = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppInitializer />
      <App />
    </BrowserRouter>
  </Provider>
);

export default AppWrapper;