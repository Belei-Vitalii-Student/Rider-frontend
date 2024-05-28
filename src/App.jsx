import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLoginData } from "./features/login/loginSlice";

function App() {
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const tokenString = localStorage.getItem("authToken");
    if (tokenString) {
      const token = JSON.parse(tokenString);
      dispatch(setLoginData(token));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
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
  );
}

export default App;
