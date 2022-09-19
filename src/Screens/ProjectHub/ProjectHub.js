import { React, useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { EmailContext } from "../../context";

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
    ProjectWiki,
  } = state;
  let navigate = useNavigate();
  const { userEmail, setUserEmail } = useContext(EmailContext);

  const goBack = () => {
    navigate(-1);
  };

  const deleteEmployee = async () => {
    await deleteDoc(doc(db, "Projects", ID));
    goBack();
  };

  function editWiki(ProjectName) {
    //router function to view detials on single project
    let path = "/Wiki";
    navigate(path, {
      state: {
        ProjectName: ProjectName,
      },
    });
  }

  const tryDelete = () => {
    let isExecuted = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (isExecuted) {
      deleteEmployee();
    }
  };

  return (
    <div>
      <div class="header">
        <Header />
      </div>
      <div class="body">
        <h1>{ProjectName}</h1>
        <h6>{ProjectDesc}</h6>
        <button className="delete-btn" onClick={() => editWiki(ProjectWiki)}>
          Project Wiki
        </button>
        <button className="delete-btn" onClick={tryDelete}>
          DELETE
        </button>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default ProjectHub;
