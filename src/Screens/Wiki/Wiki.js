import { React, useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "./Wiki.css";
import Header from "../../Components/Header/Header";

function Wiki() {
  const [wiki, setWiki] = useState("");
  const Setwiki = (event) => {
    setWiki(event.target.value);
  };

  return (
    <div>
      <div class="header">
        <Header />
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
