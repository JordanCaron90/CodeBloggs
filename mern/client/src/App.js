import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/navigations/navbar";
import Login from "./components/pages/login";
import Registration from "./components/pages/registration";
import Headercomp from "./components/navigations/headercomp";
import Home from "./components/pages/home";
import Carousel from "./components/navigations/carousel";
import NetworkView from "./components/mainViews/networkViews"
import AdminView from "./components/mainViews/adminViews"
import BloggsView from "./components/mainViews/bloggsViews"
import Header from "./components/navigations/headercomp"
import UserManagerView from "./components/mainViews/userManagerView"
import PostManagerView from "./components/mainViews/postManagerViews"


// import Loginn from "./components/test login/loginn";
// const  isLoggedIn =!!cookies.sessionToken;

const App = () => {
  const location = useLocation();

  // Determine whether to show header and navbar based on current route
  const showHeaderAndNavbar =
    location.pathname !== "/"; // change to whatever route should show header and navbar

  return (
    <div>
      {showHeaderAndNavbar && (
        <>
          <Header />
          <Navbar />
        </>
      )}
      <div style={{ margin: 20 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/network" element={<NetworkView />} />
          <Route path="/admin" element={<AdminView />} />
          <Route path="/bloggs" element={<BloggsView />} />
          <Route path="/user-manager" element={<UserManagerView />} />
          <Route path="/post-manager" element={<PostManagerView />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;