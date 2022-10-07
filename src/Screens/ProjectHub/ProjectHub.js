import { React, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { EmailContext } from "../../context";

import Lion from "../../images/Lion-white.png";
import "./ProjectHub.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import UserStories from "../../Components/UserStories/UserStories";
import Wiki from "../../Components/Wiki/Wiki";
import ViewDocuments from "../../Components/ViewDocuments/ViewDocuments";
function ProjectHub() {
  const { state } = useLocation();
  const {
    pName,
  } = state;      //state from previous page
  let navigate = useNavigate();
  const { userEmail, setUserEmail } = useContext(EmailContext);
  const projectRef = collection(db, "Projects");
  const [project, setProject] = useState({});
  const [toggleState, setToggleState] = useState(1);
  const [loading, setLoading] = useState(true);


  ////////////////////////////////////////////////////////////////

  useEffect(() => {


    const getProject = async () => {

      const q = query(projectRef, where("ProjectName", "==", pName));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setProject({ ...doc.data(), id: doc.id });
        setLoading(false);

        //console.log('Document data:', doc.data());
      });

    }

    getProject();

  },[]);

  const goBack = () => {
    navigate(-1);
  };

  function editWiki(ProjectWiki) {
    //router function to view detials on single project
    // let path = "/Wiki";
    // navigate(path, {
    //   state: {
    //     ProjectWiki: ProjectWiki,
    //     ID: ID,
    //     ProjectName: ProjectName,
    //     UserStories: UserStories
    //   },
    // });
  }

  const deleteProject = async () => {     //handles delete on single project
    //await deleteDoc(doc(db, "Projects", ID));
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
    // navigate(path, {
    //   state: {
    //     ID: ID,
    //     UserStories: UserStories,
    //     ProjectWiki: ProjectWiki,
    //     ProjectName: ProjectName
    //   },
    // });
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };

  //////////////////////////////////////////////////////////////////////

  return (
    <div>

      <div class="header">
        <Header />
      </div>
      <div class="body">
        <h3>{pName}</h3>
        <br/>
        <div className="bloc-tabs">
          <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
            <span class="material-symbols-outlined">
              checklist
            </span>
            <br/>
            User Stories
          </button>
          <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
            <span class="material-symbols-outlined">
              view_kanban
            </span>
            <br/>
            Kanban
          </button>
          <button className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}>
            <span class="material-symbols-outlined">
              import_contacts
            </span>
            <br/>
            Wiki
          </button>
          <button className={toggleState === 4 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(4)}>
            <span class="material-symbols-outlined">
              insights
            </span>
            <br />
            Insights
          </button>
          <button className={toggleState === 5 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(5)}>
            <span class="material-symbols-outlined">
              settings
            </span>
            <br/>
            Settings
          </button>
          <button className={toggleState === 6 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(6)}>
            <span class="material-symbols-outlined">
              Folder
            </span>
            <br/>
            files
          </button>
        </div>

        <div className="content-tabs">
          <div className={toggleState === 1 ? "content  active-content" : "content"}>
            {loading ? null : <UserStories project = {project} />}
          </div>

          <div className={toggleState === 2 ? "content  active-content" : "content"}>
            <p>Kanban</p>
          </div>

          <div className={toggleState === 3 ? "content  active-content" : "content"}>
            {loading ? null : <Wiki project={project} />}
          </div>

          <div className={toggleState === 4 ? "content  active-content" : "content"}>
            <p>Insights</p>
          </div>

          <div className={toggleState === 5 ? "content  active-content" : "content"}>
            <p>Settings</p>
          </div>

          <div className={toggleState === 6 ? "content  active-content" : "content"}>
            {loading ? null : <ViewDocuments project={project} />}
          </div>
        </div>


      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default ProjectHub;
