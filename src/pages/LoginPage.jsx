import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage({props}) {
    const googleLoginHandler = (response) => {
        console.log(response)
        toast.success("LOGINED")
    }

    return (
        <>
          <Dialog open={true}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
              <DialogContentText>
                You can login using google account.
              </DialogContentText>
              <GoogleLogin
                onSuccess={googleLoginHandler}
                theme='filled_blue'
                cancel_on_tap_outside={true}
                auto_select = {false}
              />
            </DialogContent>
            <DialogActions>
              <Link to={'/'}><Button variant="outlined">Back</Button></Link>
            </DialogActions>
          </Dialog>
        </>

      );
}