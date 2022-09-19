import { React, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { EmailContext } from "../../context";

import "./Landing.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import NewProject from "../../images/new_project.svg";

function Landing() {
  const [projects, setProjects] = useState([]); //array to store user's projects'
  const projectRef = collection(db, "Projects"); //collection reference to all projects
  const [teams, setTeams] = useState([]); //array to store user's teams'
  const teamRef = collection(db, "Teams"); //collection reference to all teams
  let navigate = useNavigate();
  const { userEmail, setUserEmail } = useContext(EmailContext); //email address of user logged in

  /*---------------------------------------------------------------- */

  const routeChange = () => {
    //router function to navigate site
    let path = "/scrum";
    navigate(path);
  };

  function editHub(project) {
    //router function to view detials on single project
    let path = "/projecthub";
    navigate(path, {
      state: {
        ID: project.id,
        ProjectName: project.ProjectName,
        ProjectOwner: project.ProjectOwner,
        ProjectMembers: project.ProjectMembers,
        ProjectDesc: project.ProjectDesc,
        ProjectWiki: project.ProjectWiki,
      },
    });
  }

  useEffect(() => {
    const getProjects = async () => {
      //fetching all projects from database
      const data = await getDocs(projectRef);
      setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getTeams = async () => {
      //fetching all teams from database
      const data = await getDocs(teamRef);
      setTeams(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProjects();
    getTeams();
  }, []);

  /*---------------------------------------------------------------- */

  return (
    <div>
      <div class="header">
        <Header />
      </div>
      <div class="body">
        <h1>My Dashboard</h1>
        <h4>My projects</h4>
        <div className="div-cont">
          <div className="project-div" onClick={routeChange}>
            <h6>
              <span class="material-symbols-outlined">add_circle</span>
            </h6>
          </div>
          {projects
            .filter((project) => {
              if (project.ProjectOwner === userEmail) {
                return project;
              }
            })
            .map((project) => {
              return (
                <div
                  key={project.id}
                  className="project-div"
                  onClick={() => editHub(project)}
                >
                  <h6>{project.ProjectName}</h6>
                </div>
              );
            })}
        </div>
        <h4>My teams</h4>
        <div className="div-cont">
          <div className="team-div">
            <h6>
              <span class="material-symbols-outlined">add_circle</span>
            </h6>
          </div>
          {teams
            .filter((team) => {
              if (team.TeamOwner === userEmail) {
                return team;
              }
            })
            .map((team) => {
              return (
                <div key={team.id} className="team-div">
                  <h6>{team.TeamName}</h6>
                </div>
              );
            })}
        </div>
      </div>
      <br />
      <div class="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Landing;
