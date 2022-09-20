import { React, useState, useEffect, useContext } from "react";
import { db } from "../../firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "./Wiki.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { AiOutlineConsoleSql } from "react-icons/ai";

function Wiki() {
  const { state } = useLocation();
  const { ProjectWiki, ID } = state;

  const [wiki, setWiki] = useState({ ProjectWiki });
  const Setwiki = (event) => {
    setWiki(event.target.value);
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

  return (
    <div>
      <div class="header">
        <Header />
      </div>
      <div class="body">
        <h1>{ProjectWiki}</h1>
        <input
          className="Wiki-input"
          defaultValue={ProjectWiki}
          onChange={Setwiki}
        />

        <button className="delete-btn" onClick={() => editWiki(wiki)}>
          Save
        </button>
        <br />
      </div>
      <Footer />
    </div>
  );
}

export default Wiki;
