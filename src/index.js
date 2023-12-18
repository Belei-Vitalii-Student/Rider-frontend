import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE } from './config/oAuth2/google';

ReactDOM.render(
  <GoogleOAuthProvider clientId={GOOGLE.CLIENT_ID}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);

