import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
import Adminpanel from './components/Adminpanel';
import Explore from './components/Explore';
import Profile from './components/Profile';
import UpdateProfilePost from './components/UpdateProfilePost';
import CreateProfilePost from './components/CreateProfilePost';

function App() {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    axios
      .get(`http://localhost:8080/user/${username}`)
      .then(response => {
        const role = response.data.role;
        setUserRole(role);
      })
      .catch(error => {
        console.error(`Error fetching user data: ${error}`);
      });
  }, []);

  const isAdmin = userRole && userRole.toLowerCase() === 'admin';

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        {isAdmin ? <Route path="/adminpanel" element={<Adminpanel />} /> : null}
        <Route path="/updateprofilepost" element={<UpdateProfilePost />} />
        <Route path="/createprofilepost" element={<CreateProfilePost />} />
      </Routes>
    </div>
  );
}

export default App;
