import { useNavigate, Link } from "react-router-dom";

import "./SplashScreen.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import kanban from "../../images/kanban.jpg";
import productivity from "../../images/productivity.png";
import project_management from "../../images/project_management.png";
import user_story from "../../images/user_story.png";
import hero from "../../images/hero.png";
import working from "../../images/working.mp4";
import gears from "../../images/gears.mp4";
import taskman from "../../images/taskman.mp4";

function SplashScreen() {
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
            <Link to="/Login" class="link">
              Login
            </Link>
            &nbsp;&nbsp;
            <button class="okbutton" onClick={routeChange}>
              Sign up now
            </button>
          </div>
          <div>
            <p>&nbsp;</p>
            <video
              src={working}
              width="600"
              height="420"
              loop={true}
              autoPlay={true}
              muted
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
            <video
              src={gears}
              width="500"
              height="320"
              loop={true}
              autoPlay={true}
              muted
            />
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
            <video
              src={taskman}
              width="250"
              height="280"
              loop={true}
              autoPlay={true}
              muted
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
