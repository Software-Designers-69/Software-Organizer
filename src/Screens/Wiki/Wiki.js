import { React, useState, useEffect, useContext } from "react";
import { db } from "../../firebase";
import { collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "./Wiki.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { AiOutlineConsoleSql } from "react-icons/ai";
import Lion from "../../images/Lion-white.png";


function Wiki() {
  const { state } = useLocation();
  let navigate = useNavigate();
  const { project  } = state;

  const [wiki, setWiki] = useState( project.ProjectWiki );
  const Setwiki = (event) => {
    setWiki(event.target.value);
  };

  const [projects, setProjects] = useState([]); //array to store user's projects'
  const projectRef = collection(db, "Projects"); //collection reference to all projects

  const editWiki = async (wiki) => {
    //handles adding a wiki to database
    await setDoc(
      doc(db, "Projects", project.id),
      {
        ProjectWiki: wiki,
      },
      { merge: true }
    );
    alert("Wiki edited");
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
          className="editinput"
          defaultValue={project.ProjectWiki}
          onChange={Setwiki}
          placeholder="Wiki..."
        />

        <button className="edtbtn" onClick={() => editWiki(wiki)}>
          Save
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Wiki;
