import { React, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { EmailContext } from "../../context";
import { db } from "../../firebase";
import { Timestamp, updateDoc, doc, deleteDoc } from "firebase/firestore";

import "./Add.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Lion from "../../images/Lion-white.png";

function Add() {
  const { state } = useLocation();
  const { ID, UserStories, ProjectName, ProjectWiki } = state;
  let navigate = useNavigate();
  const { userEmail, setUserEmail } = useContext(EmailContext);
  const [userStory, setUserStory] = useState("");
  const [status, setStatus] = useState("New");

  const addUserStory = async () => {
    let timestamp = Timestamp.fromDate(new Date());
    const prref = doc(db, "Projects", ID);
    await updateDoc(prref, {
      UserStories: [
        ...UserStories,
        {
          UserDate: timestamp,
          UserPoster: userEmail,
          UserStatus: status,
          UserStory: userStory,
        },
      ],
    });
    goBack();
  };

  const goBack = () => {
    let path = "/landing";
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
        <h1>Add User Story</h1>
        <div className="indiv">
          <textarea
            className="edtinput"
            type="text"
            placeholder="User Story"
            onChange={(event) => {
              setUserStory(event.target.value);
            }}
          />
          <select
            className="edtselect"
            placeholder="New"
            onChange={(event) => {
              setStatus(event.target.value);
            }}
          >
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button className="addbtn" onClick={addUserStory}>
            Add User Story
          </button>
        </div>
      </div>
      <div class="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Add;
