import { useNavigate } from 'react-router-dom';
import { useState ,useEffect } from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import '../Login/Login.css';
import './Signup.css';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from '../../firebase';
import { collection, getDocs, addDoc } from "firebase/firestore";
import emailjs from 'emailjs-com';          // library used to send users emails
import project_management from "../../images/project_management.png";

function Login() {
    let navigate = useNavigate();
    let name ,password , email ;
    const [isLogged, setIsLogged] = useState(null);



    const routeChange = () => {
        let path = '/Login';
        navigate(path);
    }
    const Setname = event => {
        name = event.target.value; 
    }
    const Setemail = event => {
        email = event.target.value; 
    }
    const Setpassword = event => {
        password = event.target.value;     
    }

    const auth = getAuth();
    const OnSignup = () => {
                
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            sendemail();                               // notifies the user after account has been created
            addDetails();                                //update table
            routeChange();                         // change to route to login after successful signup
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.alert(error)                      //temporary to show error message
        });
    }

    const addressRef = collection(db, "Users");                        //reference to the user collection
    const addDetails = async () => {                            //handles adding an item to database
      await addDoc(addressRef, { Email:email , Name:name ,Password :password })  
    }

    function sendemail() {
        var userid = "Uhi73WxfmyePOs3wU"
        emailjs.init(userid);

        var details = {
            email: email,               // user email
            to_name: name          /* data which will be needed from template may be extracted from here,
                         e.i ( name of user or subject of email)                   */  
          };

        emailjs.send('service_ew7io57', 'template_3p2jaur', details).then(function (res) {
          alert("sign-up successful");
      },
        reason => {
        alert("Invalid user email or internet connection is low");
      })
    }

    return (
        <div >
            <div class="header"><Header /></div>
            <div className='container'>
                <div className='resize'>
                    <div className="centre"><br />
                        <input className='login-input' placeholder="full Name" onChange={Setname}/><br/>      
                        <input className='login-input' placeholder="Email" onChange={Setemail}/><br/>      
                        <input className='login-input'  placeholder="Password" onChange={Setpassword}/> <br/>                        
                        <button class="Loginbutton" onClick={OnSignup}>Sign-Up</button><br/>
                        <button class="Loginbutton" >Sign-Up With GitHub</button><br/>
                        <button class="Loginbutton" >Sign-Up With GitLab</button><br/>
                    </div>
                </div>
                <div>
                    <p class="text">Start Your first Project!</p>
                    <div className='background'>
                        <img width={512} src={project_management} />
                    </div>
                </div>
            </div>
        
        </div>
    );
}

export default Login;