import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navigations/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Login from "./components/pages/login";
import Registration from "./components/pages/registration";
// import Homepage from "./components/pages/homepage";
import Headercomp from "./components/navigations/headercomp";
import Home from "./components/pages/home";
import Carousel from "./components/navigations/carousel";

// import Loginn from "./components/test login/loginn";
// const  isLoggedIn =!!cookies.sessionToken;

const App = () => {
  return (
    <div>
      <Headercomp/> 
      {/* {isLoggedIn ? <Headercomp/> : ''} */}
      <div>
      <Navbar/>
      {/* <Carousel/> */}
      {/* {isLoggedIn ? <Navbar/> : ''} */}
        <div>
          <Routes>
            <Route path="/home" element={<Home />} /> 
            {/* <Route path="/homepage" element={<Homepage />} /> */}
            <Route path="/" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            {/* isLoggedIn ? */}
            {/* <Route exact path="/RecordList" element={<RecordList />} /> */}
            {/* <Route path="/a" element={<Loginn />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
