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
import "./Scrum.css";

function Scrum() {
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
        <TextField required label="Project Name" />
        <TextField rows={3} multiline required label="Project Description" />
        <Button
          className="btn-create-project"
          sx={{ width: 300, borderRadius: 5 }}
          variant="contained"
        >
          Create Project
        </Button>
      </div>
    </div>
  );
}

export default Scrum;
