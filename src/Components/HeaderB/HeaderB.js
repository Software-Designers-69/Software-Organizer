import { Link, useNavigate } from "react-router-dom";
import { FiHelpCircle, FiHome } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { AiOutlineContacts } from "react-icons/ai";

import "./HeaderB.css";
import Lion from "../../images/LION.png";

import DarkMode from "../../Components/DarkMode/DarkMode";

function HeaderB() {
  let navigate = useNavigate();

  const routeChange = () => {
    let path = "/";
    navigate(path);
  };
  return (
    <div className="Header">
      <header className="App-header">
        <div className="left-header">
          <img src={Lion} width="40" onClick={routeChange} />
          <p class="software">&nbsp;Lion</p>
        </div>
        <div className="right-header">
          <DarkMode />
          <div className="links-header">
            <Link to="/" class="link">
              <FiHome />
              &nbsp;Home
            </Link>
            <br />

            <Link to="/contact" class="link">
              <AiOutlineContacts />
              &nbsp;Contact
            </Link>

            <Link to="/" class="link">
              <FiHelpCircle />
              &nbsp;Help
            </Link>

            <br />
            <Link to="/" class="link">
              <IoNotificationsOutline />
              &nbsp;Notifications
            </Link>
            <br />
          </div>
        </div>
      </header>
    </div>
  );
}

export default HeaderB;
