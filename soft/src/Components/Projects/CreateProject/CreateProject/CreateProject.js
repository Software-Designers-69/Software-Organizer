import React from "react";
import Typography from "@mui/material/Typography";
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
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import "./CreateProject.css";

function CreateProject() {
  return (
    <div>
      <Header />
      <div className="tittle">
        <Typography variant="h5">Create Project</Typography>
        <Typography variant="body1">Choose template for your project</Typography>
      </div>
      <div className="list">
        <List
          // dense
          sx={{
            display: "grid",
            justifyItems: "center",
            textAlign: "center",
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          {" "}
          <ListItem disablePadding>
            <ListItemButton href='scrum'>
              <ListItemAvatar>
                <Avatar>S</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={"SCRUM"}
                secondary={"Do work in short cycles."}
              />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ width: "100%" }} />
          <ListItem key={""} disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>
                  <ContentCopyRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={"DUPLICATE PROJECT"}
                secondary={"Start clean and keep your configuration."}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default CreateProject;
