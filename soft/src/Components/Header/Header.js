import { Link } from "react-router-dom";

import "./Header.css";
import Profile from "../Profile/Profile";
import Project from "../Projects/Project";

function Header() {
  return (
    <div className="Header">
      <header className="App-header">
        <div className="left-header">
          <h1 className="title-header">
            {" "}
            <Project />
          </h1>
        </div>
        <div className="right-header">
          <div className="links-header">
            <Link to="/page2" class="link">
              Link 1
            </Link>
            <br />
            <Link to="/page2" class="link">
              Link 2
            </Link>
            <br />
            <Link to="/page2" class="link">
              Link 3
            </Link>
            <br />
            <Link to="/page2" class="link">
              Link 4
            </Link>
            <Profile />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
