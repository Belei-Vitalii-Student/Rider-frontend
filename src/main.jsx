import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE } from './config/oAuth2/google.js';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.render(
  <GoogleOAuthProvider clientId={GOOGLE.CLIENT_ID}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
