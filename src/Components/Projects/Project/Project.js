import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Folder from "@mui/icons-material/Folder";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { EmailContext } from "../../../context";
import "./Project.css";

export default function Project() {
  const [project, setProject] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { userEmail, setUserEmail } = useContext(EmailContext);

  window.addEventListener("load", () => {
    fun();
  });
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fun = async () => {
    const querySnapshot = await getDocs(collection(db, "Projects"));

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      if (doc.data().ProjectMembers.includes(userEmail)) {
        setProject([...project, doc.data()]);
        console.log(doc.data().ProjectMembers);
      }
    });
  };
  useEffect(() => {
    fun();
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="My Projects">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                width: 100,
                height: 30,
                paddingLeft: 2,
                borderRadius: 3,
              }}
            >
              {" "}
              <Folder sx={{ color: "#FF7F50" }} />
              &nbsp;<Typography> Project </Typography>
            </Card>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 30,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar variant="square">
            {project.length != 0 ? project[0].ProjectName[0] : "U"}
          </Avatar>
          {project.length != 0 ? project[0].ProjectName : "Unavailabe"}
        </MenuItem>
        <Divider />
        <MenuItem>
          <Link to="/myprojects" class="show-all-projects">
            <Typography>Show all projects</Typography>
          </Link>
        </MenuItem>
        <MenuItem>
          <Button
            sx={{ bgcolor: "#FF6666" }}
            href="createprojects"
            variant="contained"
          >
            <AddSharpIcon fontSize="small" />
            Create new project
          </Button>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
