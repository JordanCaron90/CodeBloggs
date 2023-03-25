import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import Images for
import '../css/Style.css'
import profile from "../../assets/images/CodeBloggsgraphic.png"
import emails from "../../assets/images/emailLgo.png"
import passwords from "../../assets/images/padlock_321783.png"

// import for toast
import Alert  from "react-bootstrap/Alert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login(){
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isError, setIsError] = useState(false); //true = error, false = no error.
    const error = "Email or Password not matched";
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(true);
  
    const loginSubmit = (e) => {
      e.preventDefault();
      // handleValidation();
      logMe();
    };
  
    const logMe = () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        email: email,
        password: password,
      });
  
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      fetch("http://localhost:5000/user/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // isConnected(result)
          localStorage.setItem("isLoggedIn", result);
          if (result === "true") {
            toast.success("Connected", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => (window.location = "/home"), 2000);
          } else {
            setIsError(true);
            setTimeout(() => setIsError(false), 5000);
            navigate("/home");
          }
        })
        .catch((error) => console.log("error", error));
    };

    return(
        <div className="main">
            <div className="sub-main">
                <div>
                    <div className= "igsm">
                       <div className="container-images">
                            <img src={profile} alt="profile" className="profile"/>
                       </div>
                     </div>
                     <div>
                        <h1>Login Page</h1>
                        <div>
                            <img src={emails} alt="email" className="email"/>
                            <input type="text" placeholder="user name" className="name"/>
                        </div>
                        <div className="second input" style={{ marginTop: '10px' }}>
                            <img src={passwords} alt="password" className="email"/>
                            <input type="password" placeholder="password" className="name"/>
                        </div>
                        <div className="login-button">
                            <button>Login</button>
                        </div>
                        
                            <p className="link">
                                <a href="/registration">Sign Up</a>
                            </p>
                        
                     </div>
                </div>
            </div>
        </div>            
    );
}

export default Login;