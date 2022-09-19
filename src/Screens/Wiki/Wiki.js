import { React, useState, useEffect, useContext } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "./Wiki.css";
import Header from "../../Components/Header/Header";

function Wiki() {
  const [wiki, setWiki] = useState("");
  const Setwiki = (event) => {
    setWiki(event.target.value);
  };
  const { state } = useLocation();
  const { ProjectName } = state;

  const [projects, setProjects] = useState([]); //array to store user's projects'
  const projectRef = collection(db, "Projects"); //collection reference to all projects

  return (
    <div>
      <div class="header">
        <Header />
        <h1>{ProjectName}</h1>
        <input
          className="Wiki-input"
          placeholder="Enter project wiki"
          onChange={Setwiki}
        />
        <br />
      </div>
    </div>
  );
}

export default Wiki;
