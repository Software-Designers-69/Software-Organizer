import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import HeaderB from "../../Components/HeaderB/HeaderB";
import Footer from "../../Components/Footer/Footer";
import "./Login.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { EmailContext } from "../../context";
import Lottie from "lottie-react";
import circles from "../../images/circles.json";
import shapes from "../../images/shapes.json";
import wave from "../../images/wave.json";

function Login() {
  let navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(null);
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userEmail, setUserEmail } = useContext(EmailContext);

  useEffect(() => {
    //changed path if user logged in succesfully
    if (!isLogged) {
      // value is set to null because the user might try to login with the correct details later
      setIsLogged(null);
    } else {
      console.log("Path must be changed");
      routeChange();
    }
  }, [isLogged]);

  const routeChange = () => {
    let path = "/landing";
    navigate(path, { state: { email: email } });
  };
  const Setemail = (event) => {
    setEmail(event.target.value);
  };
  const Setpassword = (event) => {
    setPassword(event.target.value);
  };
  const OnLogin = () => {
    //send a function to the database to check if log the user in

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setIsLogged(true);
        setUserEmail(email);
      })
      .catch((error) => {
        // failed to sign in
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsLogged(false);
        if (errorCode === "auth/invalid-email") {
          alert("That email address is invalid!");
        } else {
          alert(errorMessage);
        }
      });
  };

  const OnForgot = () => {
    // need to do something if the user forgot password
    let path = "/forgotpass";
    navigate(path);
  };

  return (
    <div>
      <div class="header">
        <HeaderB />
      </div>
      <div className="container">
        <div className="resize">
          <div className="centre">
            <br />
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              onChange={Setemail}
            />
            <br />
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              onChange={Setpassword}
            />{" "}
            <br />
            <button className="forget-password-button" onClick={OnForgot}>
              Forgot Password?
            </button>
            <br />
            <button class="Loginbutton" onClick={OnLogin}>
              Login
            </button>
          </div>
        </div>
        <div>
          <Lottie animationData={wave} loop={true} style={{ height: 400 }} />
        </div>
      </div>
      <div class="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Login;
