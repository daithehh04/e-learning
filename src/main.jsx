import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Auth0Provider } from '@auth0/auth0-react';
import GlobalStyles from './styles/GlobalStyles.js';
import { Provider } from 'react-redux';
import { store } from './stores/store.js';
const domain = `dev-i4i8ob2vcx8ivro5.us.auth0.com`;
const clientId = `rQPbcBGkvHjYiJLk15mJnM4LBNKJuGow`;
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Provider store={store}>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </Provider>
  </Auth0Provider>
  /* </React.StrictMode> */
);
