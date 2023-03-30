import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
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


// import Loginn from "./components/test login/loginn";
// const  isLoggedIn =!!cookies.sessionToken;

const App = () => {
  return (
    <div>
      {/* <Headercomp/> */}
      <Header/>
      <div>
      <Navbar />
        <div style={{ margin: 20 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/network" element={<NetworkView />} />
          <Route path="/admin" element={<AdminView />} />
          <Route path="/bloggs" element={<BloggsView />} />
        </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
