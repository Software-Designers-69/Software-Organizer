import { useNavigate } from "react-router-dom";

import "./Landing.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import NewProject from "../../images/new_project.svg";

function Landing() {
  let navigate = useNavigate();

  const routeChange = () => {
    let path = "/page2";
    navigate(path);
  };

  return (
    <div>
      <div class="header">
        <Header />
      </div>
      <div class="body">
        <img height={250} src={NewProject} alt="NewProject" />
        <button class="new_project" onClick={routeChange}>
          Create your first project
        </button>
      </div>
      <div class="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Landing;
