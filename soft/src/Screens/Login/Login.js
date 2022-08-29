import { useNavigate } from 'react-router-dom';
import { useState ,useEffect } from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import './Login.css';
import { loginmethod} from '../../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import project_management from "../../images/project_management.png";
function Login() {
    let navigate = useNavigate();
    let password , email ;
    const [isLogged, setIsLogged] = useState(null);

    const auth = getAuth();

    useEffect(() => {
        //changed path if user logged in succesfully
        console.log(isLogged);
        if (!isLogged) {
            // value is set to null because the user might try to login with the correct details later
            setIsLogged(null);
        }
        else {
            console.log("Path must be changed");
            routeChange();
        }
    }, [isLogged]);

    const routeChange = () => {
        let path = '/';
        navigate(path);
    }
    const Setemail = event => {
        email = event.target.value; 
    }
    const Setpassword = event => {
        password = event.target.value;     
    }
    const OnLogin = () => {
        //send a function to the database to check if log the user in
        
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
        const user = userCredential.user;
        setIsLogged(true);                
        })
        .catch((error) => {
            // failed to sign in
            const errorCode = error.code;
            const errorMessage = error.message;
            setIsLogged(false);
            if (errorCode === 'auth/invalid-email') {
            console.alert('That email address is invalid!');
            }
            else {
                console.alert(error)
            }    
        });  
    }

    const OnForgot = () => {
        // need to do something if the user forgot password
 
    }

    return (
        <div >
            <div class="header"><Header /></div>
            <div className='container'>
                <div className='resize'>
                    <div className="centre"><br />         
                        <input className='login-input' placeholder="Email" onChange={Setemail}/><br/>      
                        <input className='login-input'  placeholder="Password" onChange={Setpassword}/> <br/>
                        <button className='forget-password-button'>Forgot Password?</button><br/>
                        <button class="Loginbutton" onClick={OnLogin}>Login</button>
                    </div>
                </div>
               <div>
                    <p class="txt-login">Optimize Flexibility and Efficiency</p>
                    <div className='background'>
                        <img width={512} src={project_management} />
                    </div>
                </div>
            </div>
        
        </div>
    );
}

export default Login;