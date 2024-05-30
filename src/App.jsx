import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectUserId, setLoginData } from "./features/login/loginSlice";
import { URL } from "./config/URL/urls";

function App() {
  const googleLoginHandler = (response) => {
    localStorage.setItem("accessToken", response.credential);
    fetch(URL.SERVER.HOST + URL.SERVER.ENDPOINT.AUTH, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + response.credential,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        if (data.success && data.token) {
          dispatch(setLoginData(data.token));
          localStorage.setItem("authToken", JSON.stringify(data.token));
          toast.success("Logged in successfully");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const tokenString = localStorage.getItem("authToken");
    if (tokenString) {
      const token = JSON.parse(tokenString);
      dispatch(setLoginData(token));
    }
  }, [dispatch]);

  const login = useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      googleLoginHandler(credentialResponse);
    },
    onError: (e) => {
      toast.error("Login failed");
      console.log(e);
    },
  });


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
