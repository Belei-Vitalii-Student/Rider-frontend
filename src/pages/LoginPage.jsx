import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL } from "../config/URL/urls";
import { useDispatch } from "react-redux";
import { setLoginData } from "../features/login/loginSlice";

export default function LoginPage({ props }) {
  const dispatch = useDispatch();

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
        console.log(data);
        if (data.success && data.token) {
          dispatch(setLoginData(data.token));
          localStorage.setItem("authToken", JSON.stringify(data.token));
          toast.success("Logged in successfully");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

    // console.log(response);
    // console.log(response.credential);
  };

  return (
    <>
      <Dialog open={true}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <DialogContentText>
            You can login using google account.
          </DialogContentText>
          <GoogleLogin
            onSuccess={googleLoginHandler}
            theme="filled_blue"
            cancel_on_tap_outside={true}
            auto_select={false}
          />
        </DialogContent>
        <DialogActions>
          <Link to={"/"}>
            <Button variant="outlined">Back</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}
