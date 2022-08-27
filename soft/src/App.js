import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from './Screens/Login/Login';
import MyProjects from './Components/Projects/MyProjects';
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;
