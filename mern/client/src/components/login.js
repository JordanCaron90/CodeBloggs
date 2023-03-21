import '../Style.css'
import profile from "../assets/images/CodeBloggs graphic.png"
import email from "../assets/images/emailLgo.png"
import password from "../assets/images/padlock_321783.png"

function Login(){
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
                            <img src={email} alt="email" className="email"/>
                            <input type="text" placeholder="user name" className="name"/>
                        </div>
                        <div className="second input" style={{ marginTop: '10px' }}>
                            <img src={password} alt="password" className="email"/>
                            <input type="password" placeholder="password" className="name"/>
                        </div>
                        <div className="login-button">
                            <button>Login</button>
                        </div>
                        
                            <p className="link">
                                <a href="#">Sign Up</a>
                            </p>
                        
                     </div>
                </div>
            </div>
        </div>            
    );
}

export default Login;