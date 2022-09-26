import { useNavigate, Link } from "react-router-dom";

import "./SplashScreen.css";
import HeaderB from "../../Components/HeaderB/HeaderB";
import Footer from "../../Components/Footer/Footer";
import kanban from "../../images/kanban.jpg";
import productivity from "../../images/productivity.png";
import project_management from "../../images/project_management.png";
import user_story from "../../images/user_story.png";
import hero from "../../images/hero.png";
import working from "../../images/working-dark.json";
import gears from "../../images/gears.json";
import taskman from "../../images/taskman.json";

import react from "react";
import Lottie from "lottie-react";
import Lion from "../../images/Lion.json";

function SplashScreen() {
  let navigate = useNavigate();

  const routeChange = () => {
    //router function to change navigate site
    let path = "/signup";
    navigate(path);
  };

  return (
    <div>
      <div class="header">
        <HeaderB />
      </div>
      <div class="body">
        <div class="side-by-side">
          <div>
            <p class="title">Make work work for you.&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <p>
              Collaborate, manage projects, and reach new productivity
              peaks.&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p>
              From high rises to the home office, the way your team works
              is&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
            <p>unique — accomplish it all.&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <Link to="/login" class="link">
              Login
            </Link>
            &nbsp;&nbsp;
            <button class="okbutton" onClick={routeChange}>
              Sign up now
            </button>
          </div>
          <div>
            <p>&nbsp;</p>

            <Lottie
              animationData={working}
              loop={true}
              style={{ height: 430 }}
            />
          </div>
        </div>

        <p class="title">PROJECT MANAGEMENT</p>
        <p>Stay organized and connected</p>
        <p class="description">
          Bring your team’s work together in one shared space. Choose the
          project view that suits your style, and collaborate no matter where
          you are.
        </p>
        <img height={320} src={project_management} alt="project_management" />
        <div class="side-by-side">
          <div>
            <p class="title">Measure your productivity</p>
            <p>The Best Tool to Measure Productivity</p>
            <p class="description"></p>
            <img height={320} src={productivity} alt="productivity" />
          </div>
          <div>
            <Lottie animationData={gears} loop={true} style={{ height: 250 }} />
          </div>
        </div>

        <p class="title">Kanban board</p>
        <p>It’s more than work. It’s a way of working together.</p>
        <p class="description">
          Start with a board, lists, and cards. Customize and expand with more
          features as your teamwork grows. Manage projects, organize tasks, and
          build team spirit—all in one place.
        </p>

        <div class="side-by-side">
          <div>
            <Lottie
              animationData={taskman}
              loop={true}
              style={{ height: 250 }}
            />
          </div>
          <div>
            <img height={350} src={kanban} alt="kanban" />
          </div>
        </div>

        <p class="title">Add user stories</p>
        <img height={320} src={user_story} alt="user_story" />
      </div>
      <div class="footer">
        <Footer />
      </div>
    </div>
  );
}

export default SplashScreen;
