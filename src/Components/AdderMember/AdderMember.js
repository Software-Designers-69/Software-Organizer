import { React } from "react";
import { useNavigate } from "react-router-dom";

import "./AdderMember.css";

function AdderMember(props) {
  let navigate = useNavigate();

  const routeChange = () => {
    let path = "/AddMember";
    navigate(path, {
      state: {
        project: props.project,
      },
    });
  };

  return (
    <div className="AdderWiki">
      <span
        class="material-symbols-outlined"
        id="adderwiki-icon"
        onClick={routeChange}
      >
        person_add
      </span>
    </div>
  );
}

export default AdderMember;
