import { Link, useNavigate } from "react-router-dom";
import { FiFolder, FiHelpCircle, FiHome } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { AiOutlineContacts } from "react-icons/ai";

import "./Header.css";

import Profile from "../Profile/Profile";
import Project from "../Projects/Project/Project";
import Lion from "../../images/LION.png";

import DarkMode from "../../Components/DarkMode/DarkMode";

function Header() {
  let navigate = useNavigate();

  const routeChange = () => {
    navigate(-1);
  };
  return (
    <div className="Header">
      <header className="App-header">
        <div className="left-header">
          <img src={Lion} width="40" onClick={routeChange} />
          <p class="software">&nbsp;Lion</p>
          <Project />
        </div>
        <div className="right-header">
          <div className="links-header">
            {/* <DarkMode /> */}
            <Link to="/landing" class="link">
              <FiHome />
              &nbsp;Home
            </Link>

            <Link to="/contactb" class="link">
              <AiOutlineContacts />
              &nbsp;Contact
            </Link>

            <Link to="/landing" class="link">
              <FiHelpCircle />
              &nbsp;Help
            </Link>

            <br />
            <Link to="/landing" class="link">
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
