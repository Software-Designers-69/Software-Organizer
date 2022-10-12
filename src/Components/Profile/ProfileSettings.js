import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Header from "../Header/Header";
import { getAuth, sendPasswordResetEmail, updatePassword } from "firebase/auth";
import { EmailContext } from "../../context";
import "./ProfileSettings.css";
import { db } from "../../firebase";
import { doc, getDoc, getDocs, collection, setDoc } from "firebase/firestore";

const drawerWidth = 240;

function ProfileSettings(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [showUS, setShowUS] = useState(true);
  const [showCP, setShowCP] = useState(false);

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem
          onClick={() => {
            setShowUS((prev) => (showUS ? prev : !prev));
            setShowCP(false);
          }}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary="User settings" />
          </ListItemButton>
        </ListItem>

        <ListItem
          onClick={() => {
            setShowCP((prev) => (showCP ? prev : !prev));
            setShowUS(false);
          }}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <LockOpenIcon />
            </ListItemIcon>
            <ListItemText primary="Change password" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const auth = getAuth();

  const user = auth.currentUser;
  const newPassword = "prime.1";

  const { userEmail, setUserEmail } = useContext(EmailContext);
  const [id, setID] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [EMAIL, setEMAIL] = useState("");

  const resetPass = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, EMAIL)
      .then(() => {
        // Password reset email sent!
        alert("Link was sent.");
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const dt = [];
  const updateUS = async () => {
    const querySnapshot = await getDocs(collection(db, "Users"));
    querySnapshot.forEach((doc) => {
      if (doc.data().Email === userEmail) {
        dt.push(doc.id);
      }
    });
    setID(dt);
  };
  const updateFields = async () => {
    await setDoc(
      doc(db, "Users", id[0]),
      {
        Name: name,
        Surname: surname,
      },
      { merge: true }
    );
    alert("Field(s) has been updated.");
    setName("");
    setSurname("");
    setEMAIL("");
  };

  useEffect(() => {
    updateUS();
  }, []);

  return (
    <div>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "grid" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        {showUS && (
          <Box
            component="main"
            sx={{
              display: "grid",
              rowGap: 3,
              p: 6,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar />
            <Typography sx={{ textAlign: "start" }} variant="h5">
              {" "}
              User settings
            </Typography>

            <div>
              <Typography>Name</Typography>
              <TextField
              id="newname"
                size="small"
                placeholder="New name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                value={name}
              />
            </div>
            <div>
              <Typography>Surname</Typography>
              <TextField
              id="newsurname"
                size="small"
                placeholder="New surname"
                onChange={(event) => {
                  setSurname(event.target.value);
                }}
                value={surname}
              />
            </div>

            <Button
              sx={{ width: 100, borderRadius: 4, bgcolor: "#FF6666" }}
              variant="contained"
              onClick={updateFields}
            >
              update
            </Button>
          </Box>
        )}

        {showCP && (
          <Box
            component="main"
            sx={{
              display: "grid",
              rowGap: 3,
              p: 6,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar />
            <Typography sx={{ textAlign: "start" }} variant="h5">
              {" "}
              Change password
            </Typography>
            <div>
              <Typography>Email</Typography>
              <TextField
                size="small"
                type="text"
                placeholder="Enter email address"
                onChange={(event) => {
                  setEMAIL(event.target.value);
                }}
                value={EMAIL}
              />
            </div>
            <Button
              sx={{ width: 200, borderRadius: 4, bgcolor: "#FF6666" }}
              variant="contained"
              onClick={resetPass}
            >
              Send reset link
            </Button>
          </Box>
        )}
      </Box>
    </div>
  );
}

ProfileSettings.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ProfileSettings;
