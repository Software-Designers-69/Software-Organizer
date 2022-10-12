import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Header from "../../../Header/Header";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { doc, getDoc, setDoc, addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../../../firebase";
import "./Scrum.css";
import { EmailContext } from "../../../../context";

function Scrum() {
  let navigate = useNavigate();
  const { userEmail, setUserEmail } = useContext(EmailContext);

  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projectCreator, setProjectCreator] = useState(userEmail);
  const [teamName, setTeamName] = useState("");
  // const updateProject = async () =>
  //   await setDoc(
  //     doc(db, "Projects", 'SBzZtsjwDoqmKTP0lSJv'),
  //     {
  //       ProjectName: projectName,
  //       ProjectCreator: projectCreator,
  //       ProjectDesc: projectDesc,
  //     },
  //     { merge: true }
  //   );

  const routeChange = () => {
    let path = "/landing";
    navigate(path);
  };

  const createNewProject = async () => {
    let timestamp = Timestamp.fromDate(new Date());
    await setDoc(
      doc(collection(db, "Projects")),
      {
        ProjectName: projectName,
        ProjectOwner: projectCreator,
        ProjectDesc: projectDesc,
        ProjectWiki: "",
        ProjectTeam: teamName,
        ProjectMembers: [userEmail],
        UserStories:[{UserDate: timestamp, UserPoster: userEmail, UserStatus: 'New', UserStory: 'This is your first user story', AssignedTo: userEmail}],
        Documents: []

      },
      { merge: true }
    );
    await setDoc(
      doc(collection(db, "Teams")),
      {
        TeamOwner: projectCreator,
        TeamName: teamName,
        TeamMembers: [userEmail],
      },
      { merge: true }
    );
    routeChange();
    
    setTeamName('');
    setProjectDesc('');
    setProjectName('');
  };

  return (
    <div>
      <Header />
      <div className="tittle">
        <Typography variant="h5">Create Project</Typography>
      </div>

      <div className="project-details">
        <Typography>New Project details</Typography>
        <TextField
          onChange={(event) => {
            setProjectName(event.target.value);
          }}
          required
          label="Project Name"
          value={projectName}
        />
        <TextField
          onChange={(event) => {
            setTeamName(event.target.value);
          }}
          multiline
          required
          label="Team Name"
          value={teamName}
        />
        <TextField
          onChange={(event) => {
            setProjectDesc(event.target.value);
          }}
          rows={3}
          multiline
          required
          label="Project Description"
          value={projectDesc}
        />
        <Button
          className="btn-create-project"
          sx={{ bgcolor: "#FF6666", width: 300, borderRadius: 5 }}
          variant="contained"
          onClick={createNewProject}
        >
          Create Project
        </Button>
      </div>
    </div>
  );
}

export default Scrum;
