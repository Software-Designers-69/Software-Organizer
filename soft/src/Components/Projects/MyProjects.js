import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Header from "../Header/Header";
import "./MyProjects.css";

export default function CheckboxListSecondary() {
  const [checked, setChecked] = React.useState([1]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div>
      <Header />
      <Card className="card">
        {" "}
        <Typography
          sx={{ padding: 3, textDecoration: "underline" }}
          variant="h5"
        >
          {" "}
          My Projects
        </Typography>{" "}
        <div>
          <Button
            sx={{ bgcolor: "#FF6666", borderRadius: 4 }}
            variant="contained"
          >
            New project
          </Button>
        </div>
      </Card>
      <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          const lis = ["Tisetso", " Prime", " Thulasizwe", " Tsepiso"];
          return (
            <div>
              {" "}
              <ListItem key={value} disablePadding>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar>P</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    primary={`Project ${value + 1}`}
                    secondary={lis + ","}
                  />
                </ListItemButton>
              </ListItem>
              <Divider sx={{ width: "80%" }} />
            </div>
          );
        })}
      </List>
    </div>
  );
}
