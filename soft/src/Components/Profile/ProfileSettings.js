import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Header from "../Header/Header";
import "./ProfileSettings.css";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
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
              <Typography>Username</Typography>
              <TextField size="small" defaultValue="My username" />
            </div>
            <div>
              <Typography>email</Typography>
              <TextField size="small" defaultValue="My email address" />
            </div>
            <div>
              <Typography>Full name</Typography>
              <TextField size="small" placeholder="Full name" />
            </div>
            <Button sx={{width: 100, borderRadius: 4, bgcolor: "#FF6666"}} variant='contained'>update</Button>

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
              <Typography>Current password</Typography>
              <TextField
                size="small"
                type="password"
                placeholder="Type in current password"
              />
            </div>
            <div>
              <Typography>New password</Typography>
              <TextField
                size="small"
                type="password"
                placeholder="Type in new password"
              />
            </div>
            <div>
              <Typography>Confirm new password</Typography>
              <TextField
                size="small"
                type="password"
                placeholder="Confirm new password"
              />
            </div>
            <Button sx={{width: 100, borderRadius: 4, bgcolor: "#FF6666"}} variant='contained'>update</Button>
          </Box>
        )}
      </Box>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
