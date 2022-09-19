import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { React, useState } from "react";

import { EmailContext } from './context';
import Login from './Screens/Login/Login';
import MyProjects from './Components/Projects/MyProjects/MyProjects';
import CreateProject from './Components/Projects/CreateProject/CreateProject/CreateProject';
import SplashScreen from './Screens/SplashScreen/SplashScreen';
import SignUp from "./Screens/SignUp/SignUp";
import Landing from "./Screens/Landing/Landing";
import ProfileSettings from './Components/Profile/ProfileSettings';
import Scrum from './Components/Projects/CreateProject/Scrum/Scrum';
import ProjectHub from './Screens/ProjectHub/ProjectHub';
import Contact from './Screens/Contact/Contact';
import ContactB from "./Screens/ContactB/ContactB";

function App() {
  const [userEmail, setUserEmail] = useState('');

  return (
    <EmailContext.Provider value={{ userEmail, setUserEmail }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myprojects" element={<MyProjects />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="createprojects" element={<CreateProject />} />
          <Route path="scrum" element={<Scrum />} />
          <Route path="profilesettings" element={<ProfileSettings />} />
          <Route path="projecthub" element={<ProjectHub />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contactb" element={<ContactB />} />



        </Routes>
      </BrowserRouter>
    </EmailContext.Provider>
  );
}

export default App;
