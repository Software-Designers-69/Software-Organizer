import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import HeaderB from '../../Components/HeaderB/HeaderB';
import Footer from '../../Components/Footer/Footer';
import '../Login/Login.css';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { db } from '../../firebase';
import { collection, getDocs, addDoc } from "firebase/firestore";
import emailjs from 'emailjs-com';          // library used to send users emails
import project_management from "../../images/project_management.png";
import { EmailContext } from '../../context';


function ForgotPass() {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLogged, setIsLogged] = useState(null);


    const auth = getAuth();

    const triggerResetEmail = async () => {
        await sendPasswordResetEmail(auth, email)
        .then(() => {
                // email sent
            routeChange(); 
            })
            .catch((error) => {
                // failed
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode , errorMessage);
            });        
        console.log("Password reset email sent");
    }
    const routeChange = () => {
        let path = '/login';
        navigate(path);
    }
    const Setemail = event => {
        setEmail(event.target.value);
    }


    return (
        <div >
            <div class="header"><HeaderB /></div>
            <div className='container'>
                <div className='resize'>
                    <div className="centre"><br />
                        <input className='login-input' type ="email"  placeholder="Email" onChange={Setemail} /><br />
                        <button class="Loginbutton" onClick={triggerResetEmail}>Reset Password</button><br />
                        <br />
                    </div>
                </div>
                <div className='background'></div>
            </div>
            <div class = "Footer">
                <Footer />
            </div>
            <div class="footer"><Footer /></div>
        </div>
    );
}

export default ForgotPass;