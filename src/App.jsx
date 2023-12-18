import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import Map from './components/Map/Map';
import { GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {
  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  return (
    <div className='App'>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
      </BrowserRouter>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
    // // <div className='app'>
    // //   <div style={{ height: '100vh', width: '100%' }}>
    //     <Map /> */
  );
}

export default App;
