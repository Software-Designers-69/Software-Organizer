import { React, useContext, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { EmailContext } from "../../context";
import { db } from '../../firebase';
import { Timestamp, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { fiFile ,FiHome} from "react-icons/fi";

import './AddDocument.css';
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Lion from "../../images/Lion-white.png";



function AddDocument() {
  const { state } = useLocation();
  const { ID, UserStories, ProjectName, ProjectWiki } = state;    //state from previous page
  let navigate = useNavigate();
  const { userEmail, setUserEmail } = useContext(EmailContext);   //email of user logged in
  const [userStory, setUserStory] = useState('');
  const [status, setStatus] = useState('New');      //default status for new user story is new
  const [filename, setFilename] = useState('    File name.pdf'); 
  const addUserStory = async () => {      //adds new user story to the project in database
    let timestamp = Timestamp.fromDate(new Date());
    const prref = doc(db, 'Projects', ID);
    await updateDoc(prref , {
        UserStories: [...UserStories, {
            UserDate: timestamp,
            UserPoster: userEmail,
            UserStatus: status,
            UserStory: userStory
        }]
    })
    goBack();
  };

  const goBack = () => {
    let path = '/landing';
    navigate(path);
  }


  function editWiki(ProjectWiki) {
    //router function to view detials on single project
    let path = "/Wiki";
    navigate(path, {
      state: {
        ProjectWiki: ProjectWiki,
        ID: ID,
        ProjectName: ProjectName,
        UserStories: UserStories
      },
    });
  }

  const deleteProject = async () => {
    await deleteDoc(doc(db, "Projects", ID));
    goBack();
  };

  const tryDelete = () => {
    let isExecuted = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (isExecuted) {
      deleteProject();
    }
  };

  

  return (
    <div>
        <div class="header">
            <Header />
        </div>
        <div class="body">
        <div className="side-content">
          <div className="liondiv">
            <img src={Lion} width="40" onClick={goBack} className="lionimg" />
          </div>
          <h3>{ProjectName}</h3>
          <h6 onClick={() => editWiki(ProjectWiki)}>Add Wiki </h6>
          <h6>Add new user story</h6>
          <h6 onClick={tryDelete}>Delete project</h6>
        </div>
            <h3>Add A Document</h3>
            <div className="indiv">
            <textarea className = 'input-description' type="text" placeholder="Description of the document" onChange={(event)=> {setUserStory(event.target.value)}}/>
            <div>
                <button className="select-pdf-btn" > Select PDF file </button>
                <text className='file-name'>{filename}</text>
                <button className="add-doc-btn" >Add Document</button>
            </div>           
              </div>
        </div>
        <div class="footer"><Footer />
        </div>
    </div>
  )
}

export default AddDocument