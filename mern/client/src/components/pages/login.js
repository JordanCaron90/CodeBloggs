import { useState } from "react";
import { useNavigate } from "react-router";
import useCookie from 'react-use-cookie';
import '../css/Style.css'
import profilePicture from "../../images/CodeBloggs graphic.png"
import emailIcon from "../../images/emailLgo.png"
import passwordIcon from "../../images/padlock_321783.png"

function Login(){
    const navigate = useNavigate();
    const [userToken, setUserToken] = useCookie('token', '0');
    const [userId, setUserId] = useCookie('user_id', '');
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        let loginData = await fetchLogin();
        if(loginData.type == "error"){
            navigate("/");
        }
        else{
            let sessionData = await fetchSession(loginData.data);
            setUserId(loginData.data._id)
            setUserToken(sessionData.data.session_id);
            navigate("/mainpage");
        };
    };

    async function fetchLogin(id){
        let newLogin = { ...form };
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newLogin)
        };

        try {
            const fetchResponse = await fetch(`http://localhost:5000/user/login`, settings);
            const data = await fetchResponse.json();
            return data;
        } catch (e) {
            return e;
        }    
    }

    async function fetchSession(user){
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user:user})
        };

        try {
            const fetchResponse = await fetch(`http://localhost:5000/session`, settings);
            const data = await fetchResponse.json();
            return data;
        } catch (e) {
            return e;
        }    
    }
    
     // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
        return { ...prev, ...value };
        });
    };

    return(
        <div className="main">
            <div className="sub-main">
                <form onSubmit={handleSubmit}>
                    <div className= "igsm">
                       <div className="container-images">
                       {/* <img src={process.env.PUBLIC_URL+ '/images/Codebloggs graphic.png'}/> */}
                            <img src={profilePicture} alt="profile" className="profile"/>
                       </div>
                     </div>
                     <div>
                        <h1>Login Page</h1>
                        <div>
                            <img src={emailIcon} alt="email" className="email"/>
                            <input 
                                type="text" 
                                placeholder="email" 
                                className="name"
                                name="Email"
                                value={form.email}
                                onChange={(e) => updateForm({ email: e.target.value })}
                            />
                        </div>
                        <div className="second input" style={{ marginTop: '10px' }}>
                            <img src={passwordIcon} alt="password" className="email"/>
                            <input 
                                type="password" 
                                placeholder="password" 
                                className="name"
                                name="Password"
                                value={form.password}
                                onChange={(e) => updateForm({ password: e.target.value })}
                        />
                        </div>
                        <div className="login-button">
                            <button type="submit">Login</button>
                        </div>
                        
                            <p className="link">
                                <a href="/registration">Sign Up</a>
                            </p>
                        
                     </div>
                </form>
            </div>
        </div>            
    );
}

export default Login;