// import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer.jsx";

function Login() {
  const [{}, dispatch] = useStateValue();
  //   const signIn = () => {
  //     auth.signInWithPopup(provider)
  //     .then((result) => console.log(result))
  //     .catch((error) => alert(error.message));
  //   };

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img src="../../src/Image/whatsappLogo.png" alt="WhatsApp Logo" />
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>

        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;
