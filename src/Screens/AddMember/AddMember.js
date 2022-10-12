import { React, useState, useEffect, useContext } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  setDoc,
  updateDoc,
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
  const { project } = state;

  const [name, setName] = useState('');
  const Setname = (event) => {
    setName(event.target.value);
  };

  const addMember = async () => {
    //handles adding a new member to the project/team
    const prref = doc(db, "Projects", project.id);
    await updateDoc(prref, {
      ProjectMembers: [...project.ProjectMembers, name],
    });
    alert("Member Added");
    goBack();
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div class="header">
        <Header />
      </div>
      <div class="body">
        <textarea
          type="text"
          className="editmember"
          onChange={Setname}
          placeholder="New member..."
        />

        <button className="edtbtnmember" onClick={addMember}>
          Add
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default AddMember;
