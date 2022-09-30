import { React, useState, useEffect, useContext } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "./AddMember.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { AiOutlineConsoleSql } from "react-icons/ai";
import Lion from "../../images/Lion-white.png";

function AddMember() {
  const { state } = useLocation();
  let navigate = useNavigate();
  const {
    ID,
    ProjectMembers,
    TeamMembers,
    ProjectName,
    UserStories,
    ProjectWiki,
  } = state;

  const [name, setName] = useState();
  const Setname = (event) => {
    setName(event.target.value);
  };

  const [projects, setProjects] = useState([]); //array to store user's projects'
  const projectRef = collection(db, "Projects"); //collection reference to all projects

  const editWiki = async (wiki) => {
    //handles adding a wiki to database
    await setDoc(
      doc(db, "Projects", ID),
      {
        ProjectWiki: wiki,
      },
      { merge: true }
    );
    alert("Wiki edited");
  };

  const addMember = async (name) => {
    //handles adding a new member to the project/team
    const prref = doc(db, "Projects", ID);
    await updateDoc(prref, {
      ProjectMembers: [...ProjectMembers, name],
    });
    alert("Member Added");
  };

  const addMemberTeam = async (name) => {
    //handles adding a new member to the project/team
    const prref = doc(db, "Teams", ID);
    await updateDoc(prref, {
      TeamMembers: [...TeamMembers, name],
    });
  };

  const goBack = () => {
    navigate(-1);
  };

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
        <h1>Add Member</h1>
        <div>
          <textarea
            type="text"
            className="editinput"
            onChange={Setname}
            placeholder="New Member..."
          />

          <button
            className="edtbtn"
            onClick={() => {
              addMember(name);
              addMemberTeam(name);
            }}
          >
            Add
          </button>
        </div>
        <br />
      </div>
      <Footer />
    </div>
  );
}

export default AddMember;
