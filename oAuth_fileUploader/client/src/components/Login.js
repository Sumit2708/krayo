import React from "react";

function Login() {
  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };
  return (
    <div className="container">
        <h1>Login to Access App</h1>
        <button className="google_btn" onClick={googleAuth}>
          <img src="./images/google.png" alt="google icon" />
          <span>Sing in with Google</span>
        </button>
    </div>
  );
}

export default Login;
