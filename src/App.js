import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate} from "react-router-dom";
import { React, useState, useEffect} from "react";
import { verifyUser } from "./services/user.js";
import Home from "./screens/Home.jsx";
import Nav from "./components/Nav.jsx";
import SignUp from "./screens/SignUp.jsx";
import SignIn from "./screens/SignIn.jsx";
import SignOut from "./screens/SignOut.jsx";
import Country from "./screens/Country.jsx";
// import { verifyUser } from "./services/user.js";

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifyUser()
      user ? setUser(user) : setUser(null)
    }
    fetchUser()
  }, [])


  return (
    <div className="App">
      <Nav user={user}/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:name" element={<Country user={user} />} />
      <Route path="/sign-up" element={<SignUp setUser={setUser} />} />
      <Route path="/sign-in" element={<SignIn setUser={setUser} />} />
      <Route path="/sign-out" element={<SignOut setUser={setUser} />} />

      </Routes>
     
      
      
      
    </div>
  );
}

export default App;
