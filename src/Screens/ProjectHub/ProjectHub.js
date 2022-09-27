import { React, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { EmailContext } from "../../context";

import Lion from "../../images/Lion-white.png";
import "./ProjectHub.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

function ProjectHub() {
  const { state } = useLocation();
  const {
    ID,
    ProjectName,
    ProjectOwner,
    ProjectMembers,
    ProjectDesc,
    UserStories,
    ProjectWiki,
  } = state;
  let navigate = useNavigate();
  const { userEmail, setUserEmail } = useContext(EmailContext);

  const goBack = () => {
    navigate(-1);
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

  const goAdd = () => {
    let path = "/add";
    navigate(path, {
      state: {
        ID: ID,
        UserStories: UserStories,
        ProjectWiki: ProjectWiki,
        ProjectName: ProjectName,
      },
    });
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
          <h6 onClick={goAdd}>Add new user story</h6>
          <h6 onClick={tryDelete}>Delete project</h6>
        </div>
        <h1>User Stories</h1>
        <div className="storycont">
          {UserStories.map((story) => {
            return (
              <div key={story.id} className="story-div">
                <h4>{story.UserStory}</h4>
                <div className="story-bottom">
                  <p className="story-details">Posted by: {story.UserPoster}</p>
                  <p className="story-details">Status: {story.UserStatus}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default ProjectHub;
