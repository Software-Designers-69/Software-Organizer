import { React, useContext, useState } from 'react';      //importing required artifacts from react
import { useNavigate, useLocation } from "react-router-dom";      //importing required artifacts from react-router-dom
import { EmailContext } from "../../context";       //email context for user logged in
import { db } from '../../firebase';      //importing database from our firebase config
import { Timestamp, updateDoc, doc, deleteDoc } from "firebase/firestore";      //importing required artifacts from firestore


import './Add.css';
import Header from "../../Components/Header/Header";      //importing header from components
import Footer from "../../Components/Footer/Footer";      //importing footer from components



function Add() {
  const { state } = useLocation();
  const { project } = state;    //state from previous page
  let navigate = useNavigate();
  const { userEmail, setUserEmail } = useContext(EmailContext);   //email of user logged in
  const [userStory, setUserStory] = useState('');
  const [userTitle, setUserTitle] = useState('');

  const [status, setStatus] = useState('New');      //default status for new user story is new

  const addUserStory = async () => {      //adds new user story to the project in database
    let timestamp = Timestamp.fromDate(new Date());
    const prref = doc(db, 'Projects', project.id);
    await updateDoc(prref , {
        UserStories: [{
            AssignedTo: userEmail,
            UserTitle: userTitle,
            UserDate: timestamp,
            UserPoster: userEmail,
            UserStatus: status,
            UserStory: userStory
      }, ...project.UserStories]
    })      //handles user story updates
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
            <input className='edtin' type="text" placeholder="User Title" onChange={(event) => { setUserTitle(event.target.value) }} />
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