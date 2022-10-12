import { React, useContext, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { EmailContext } from "../../context";
import { db } from '../../firebase';
import { Timestamp, updateDoc, doc, deleteDoc } from "firebase/firestore";


import './Add.css';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";



function Add() {
  const { state } = useLocation();
  const { project } = state;    //state from previous page
  let navigate = useNavigate();
  const { userEmail, setUserEmail } = useContext(EmailContext);   //email of user logged in
  const [userStory, setUserStory] = useState('');
  const [status, setStatus] = useState('New');      //default status for new user story is new

  const addUserStory = async () => {      //adds new user story to the project in database
    let timestamp = Timestamp.fromDate(new Date());
    const prref = doc(db, 'Projects', project.id);
    await updateDoc(prref , {
        UserStories: [{
            UserDate: timestamp,
            UserPoster: userEmail,
            UserStatus: status,
            UserStory: userStory
      }, ...project.UserStories]
    })
    navigate(-1);
  };


  return (
    <div>
        <div class="header">
            <Header />
        </div>
        <div class="body">
        
            <h3>Add User Story</h3>
            <div className="indiv">
            <textarea className = 'edtinput' type="text" placeholder="User Story" onChange={(event)=> {setUserStory(event.target.value)}}/>
              <select className='edtselect' placeholder="New" onChange={(event) => { setStatus(event.target.value) }}>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
            <button className="addbtn" onClick={addUserStory}>Add User Story</button>
            </div>
        </div>
        <div class="footer">
            <Footer />
        </div>
    </div>
  )
}

export default Add