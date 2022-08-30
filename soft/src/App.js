import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from './Screens/Login/Login';
import MyProjects from './Components/Projects/MyProjects/MyProjects';
import CreateProject from './Components/Projects/CreateProject/CreateProject/CreateProject';
import Scrum from './Components/Projects/CreateProject/Scrum/Scrum';
import SplashScreen from './Screens/SplashScreen/SplashScreen';
import Page2 from "./Screens/Page2/Page2";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="page2" element={<Page2 />} />
        <Route path="Login" element={<Login />} />
        <Route path="myprojects" element={<MyProjects />} />
        <Route path="createprojects" element={<CreateProject />} />
        <Route path="scrum" element={<Scrum />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
