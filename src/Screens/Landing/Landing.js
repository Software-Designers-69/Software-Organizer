import { React, useState, useEffect, useContext } from "react";       //importing required artifacts from react
import { useNavigate, useLocation } from "react-router-dom";          //importing required artifacts from react-router-dom
import { db } from "../../firebase";          //importing data from our firebase config
import { collection, getDocs, query, where } from "firebase/firestore";       //importing required artifacts from firestore
import { EmailContext } from "../../context";         //global email context for user logged in

import "./Landing.css";
import Header from "../../Components/Header/Header";          //importing header from components
import Footer from "../../Components/Footer/Footer";          //importing footer from components
import NewProject from "../../images/new_project.svg";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner"       //importing loading spinner from components

function Landing() {
  const [projects, setProjects] = useState([]); //array to store user's projects'
  const projectRef = collection(db, "Projects"); //collection reference to all projects
  const [teams, setTeams] = useState([]); //array to store user's teams'
  const teamRef = collection(db, "Teams"); //collection reference to all teams
  let navigate = useNavigate();
  const { userEmail, setUserEmail } = useContext(EmailContext); //email address of user logged in
  const [loading, setLoading] = useState(true);

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
        pName: project.ProjectName
      },
    });
  }

  function teamHub(team) {
    //router function to view detials on single team
    let path = "/teamhub";
    navigate(path, {
      state: {
        tName: team.TeamName
      },
    });
  }

  useEffect(() => {
    const getProjects = async () => {
      //fetching all projects from database

      const q = query(projectRef , where("ProjectMembers", "array-contains", userEmail));     //get all projects user is a member of

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setProjects(projects => [ ...projects,{ ...doc.data(), id: doc.id }]);        //set projects array state
      });
      
    };

    const getTeams = async () => {
      //fetching all teams from database
      const q = query(teamRef , where("TeamMembers", "array-contains", userEmail));         //get all teams user is a member of

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setTeams(teams => [...teams, { ...doc.data(), id: doc.id }]);         //set teams array state
        setLoading(false);            //sets loading to false as all data has been retrieved
      });
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
      {loading ? <LoadingSpinner /> :
      <div class="body">
        <h1>My Dashboard</h1>
        <h4>My projects</h4>
        <div className="div-cont">
          <div className="team-div" onClick={routeChange}>
            <h6>
              <span class="material-symbols-outlined">add_circle</span>
            </h6>
          </div>
          {projects.map((project) => {
            return (
              <div
                key={project.id}
                className="team-div"
                onClick={() => editHub(project)}
              >
                <h6>{project.ProjectName}</h6>
              </div>
            );
          })}
        </div>
        {/* <h4>My teams</h4>
        <div className="div-cont">
          
          {teams.map((team) => {
              return (
                <div 
                  key={team.id} 
                  className="team-div"
                  onClick={() => teamHub(team)}
                >
                  <h6>{team.TeamName}</h6>
                </div>
              );
            })}
        </div> */}
      </div>}
      <br />
      <div class="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Landing;
