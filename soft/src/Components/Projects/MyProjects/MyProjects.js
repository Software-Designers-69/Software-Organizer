import * as React from "react";
import { useState, useEffect } from "react";
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
import Header from "../../Header/Header";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import "./MyProjects.css";

export default function CheckboxListSecondary() {
  const [project, setProject] = useState([]);
  const [checked, setChecked] = React.useState([1]);
  window.addEventListener("load", () => {
    fun();
  });
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

  const fun = async () => {
    const docRef = doc(db, "Projects", "4oYuLCC89oM4nekdkqhI");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setProject([...project, docSnap.data()]);
    }
  };
  useEffect(() => {
    fun();
  }, []);

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
        <div>
          {" "}
          <ListItem key={""} disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>
                  {project.length != 0 ? project[0].ProjectName[0] : "U"}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  project.length != 0 ? project[0].ProjectName : "Unavailable"
                }
                secondary={
                  project.length != 0
                    ? project[0].ProjectMembers.map((member, index) => {
                        let v = "";
                        index == project[0].ProjectMembers.length - 1
                          ? (v = ".")
                          : (v = ", ");
                        return member + v;
                      })
                    : ""
                }
              />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ width: "80%" }} />
        </div>
      </List>
    </div>
  );
}
