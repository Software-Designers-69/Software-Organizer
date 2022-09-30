import { React, useContext, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { EmailContext } from "../../context";
import { db } from '../../firebase';
import { Timestamp, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { fiFile ,FiHome} from "react-icons/fi";
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './AddDocument.css';
import { v4 } from "uuid";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Lion from "../../images/Lion-white.png";



function AddDocument() {
  const { state } = useLocation();
  const { ID, UserStories, ProjectName, ProjectWiki, Documents } = state;    //state from previous page
  const [percent, setPercent] = useState('');
  let navigate = useNavigate();
  const { userEmail, setUserEmail } = useContext(EmailContext);   //email of user logged in
  const [userStory, setUserStory] = useState('');
  const [status, setStatus] = useState('New');      //default status for new user story is new
  const [fileDescription, setFileDescription] = useState('No description provided '); 
  const [filename, setfilename] = useState(''); 
  const [file, setfile] = useState(null); 

  /*       ---------------------------------------   */
  const addfile = async (unique) => {      //add a new file to the project in database
    const prref = doc(db, 'Projects', ID);
    await updateDoc(prref , {
        Documents: [...Documents,{
          filename:file.name,
          fileDescription: fileDescription,
          UserPoster: userEmail,
          file:unique
        }]
    })
    goBack();
  };

  const goBack = () => {
    let path = '/landing';
    navigate(path);
  };

  function editWiki(ProjectWiki) {
    //router function to view detials on single project
    let path = "/Wiki";
    navigate(path, {
      state: {
        ProjectWiki: ProjectWiki,
        ID: ID,
        ProjectName: ProjectName,
        UserStories: UserStories,
        Documents:Documents
      },
    });
  }

  const deleteProject = async () => {     //handles delete on single project
    await deleteDoc(doc(db, "Projects", ID));
    goBack();
  };

  const tryDelete = () => {     //confrms intention to delete a single project
    let isExecuted = window.confirm(    //pop up to confirm deletion
      "Are you sure you want to delete this project?"
    );
    if (isExecuted) {
      deleteProject();
    }
  };

  const goAdd = () => {   //navigates to adding stories
    let path = "/add";
    navigate(path, {
      state: {
        ID: ID,
        UserStories: UserStories,
        ProjectWiki: ProjectWiki,
        ProjectName: ProjectName,
        Documents:Documents
      },
    });
  };
  const getFile = (event) =>{
    setfile(event.target.files[0]);               //the file which is to be added to the database
  }
    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }
 
        /* unique is a random,unique string which will be used to reference the
        the actual file in the database*/
        let unique = v4();  
        const storageRef = ref(storage, `files/${unique}`);
 
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);
 
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
 
                // update progress
                setPercent(percent+"%");
            },
            (err) => console.log(err),
            () => {
                /*        uploaded succesfully       */
                addfile(unique);
                
            }
        );
    };

  return (
    <div>
        <div class="header"><Header /></div>
        <div class="body">
          <div className="side-content">
            <div className="liondiv">
              <img src={Lion} width="40" onClick={goBack} className="lionimg" />
            </div>
            <h3>{ProjectName}</h3>
            <h6 onClick={() => editWiki(ProjectWiki)}>Add Wiki </h6>
            <h6 onClick={goAdd}>Add new user story</h6>
            <h6 onClick={tryDelete}>Delete project</h6>
            <h6>Add Documents</h6>
          </div>
          <h3>Add A Document</h3>
          <div className="indiv">
            <textarea className = 'input-description' type="text" placeholder="Description of the document" onChange={(event)=> {setFileDescription(event.target.value)}}/>
            <div>
              <input type="file" name="file" onChange={(event) => { getFile(event) }}/>
              <text className ="text-percent">{percent}</text>
              <button className="add-doc-btn" onClick={handleUpload} >Add Document</button>
            </div>           
          </div>
        </div>
        <div class="footer"><Footer /></div>
    </div>
  )
}

export default AddDocument