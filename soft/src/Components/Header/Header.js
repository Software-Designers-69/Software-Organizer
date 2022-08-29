import { Link } from "react-router-dom";
import { FiFolder, FiHelpCircle } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

import "./Header.css";

import Profile from "../Profile/Profile";
import Project from "../Projects/Project";
import Lion from "../../images/LION.ico";

function Header() {
  return (
    <div className="Header">
      <header className="App-header">
        <div className="left-header">
          <img src={Lion} width="35" />
          <p class="software">&nbsp;Lion</p>
          <Project />
        </div>
        <div className="right-header">
          <div className="links-header">
            <Link to="/page2" class="link">
              <FiHelpCircle />
              &nbsp;Help
            </Link>

            <br />
            <Link to="/page2" class="link">
              <IoNotificationsOutline />
              &nbsp;Notifications
            </Link>
            <br />
            <Profile />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
