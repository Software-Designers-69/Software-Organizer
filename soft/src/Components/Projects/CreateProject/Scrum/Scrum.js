import React from "react";
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
import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import "./Scrum.css";

function Scrum() {
  let projectName,
    projectDesc,
    projectCreator = "Prime@gmail.com",
    teamName;
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

  const createNewProject = async () =>
    await setDoc(
      doc(collection(db, "Projects")),
      {
        ProjectName: projectName,
        ProjectOwner: projectCreator,
        ProjectDesc: projectDesc,
        ProjectTeam: teamName,
        ProjectMembers: ["Prime@gmail.com"],
      },
      { merge: true }
    );

  return (
    <div>
      <Header />
      <div className="tittle">
        <Typography variant="h5">Create Project</Typography>
        <Typography variant="body1">
          Choose template for your project
        </Typography>
      </div>

      <div className="project-details">
        <Typography>New Project details</Typography>
        <TextField
          onChange={(event) => {
            projectName = event.target.value;
          }}
          required
          label="Project Name"
        />
        <TextField
          onChange={(event) => {
            teamName = event.target.value;
          }}
          multiline
          required
          label="Team Name"
        />
        <TextField
          onChange={(event) => {
            projectDesc = event.target.value;
          }}
          rows={3}
          multiline
          required
          label="Project Description"
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
